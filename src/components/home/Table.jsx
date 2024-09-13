import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./table.module.css";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/joy/CircularProgress";

function createData(name, andel, type) {
  return { name, andel, type };
}

//sorting
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default function BasicTable(props) {
  const [tableData, setTableData] = useState([]);
  const { items, requestSort, sortConfig } = useSortableData(tableData);
  const [isLoading, setIsLoading] = useState(false);
  const setError = (message) => {};

  const fetchOnlineFondData = async () => {
    setIsLoading(true);
    const data = await fetch("/api/fonddata/getpositions").then((res) =>
      res.json()
    );
    setIsLoading(false);
    if (data.error) {
      setTableData([]);

      setError(data.error);
    } else if (data.data) {
      const dataRow = [];
      data.data.forEach((arr) => {
        const val = arr.percent.toString().slice(0, 4);
        dataRow.push(
          createData(
            arr.instrument.name,
            Number(val),
            arr.instrument.sector_group
          )
        );
      });
      setTableData(dataRow);
    }
  };
  useEffect(() => {
    fetchOnlineFondData();
  }, []);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className={styles.table_main}>
      {isLoading ? (
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <CircularProgress size="lg" variant="plain" />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={styles.table_header}>
                <TableCell style={{ color: "white" }}>
                  <TableSortLabel
                    active={sortConfig !== null && sortConfig.key == "name"}
                    direction={getClassNamesFor("name")}
                    onClick={() => {
                      requestSort("name");
                    }}
                  >
                    Fond
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  <TableSortLabel
                    active={sortConfig !== null && sortConfig.key == "andel"}
                    direction={getClassNamesFor("andel")}
                    onClick={() => {
                      requestSort("andel");
                    }}
                  >
                    Andel
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  <TableSortLabel
                    active={sortConfig !== null && sortConfig.key == "type"}
                    direction={getClassNamesFor("type")}
                    onClick={() => {
                      requestSort("type");
                    }}
                  >
                    Kategori
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ color: "white" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    {row.andel}
                  </TableCell>
                  <TableCell align="right" style={{ color: "white" }}>
                    {row.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
