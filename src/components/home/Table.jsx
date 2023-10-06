import * as React from 'react';
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';
import Box from '@mui/material/Box';

//need to add filter options
//darker header 
function createData(name, andel, type) {
  return { name, andel, type };
}


export default function BasicTable(props) {
    const [tableData, setTableData] = useState([]);
    const setError = (message) => {
    }

    const fetchOnlineFondData = async () => {
        const data = await fetch('/api/fonddata/getpositions').then((res) => res.json());
        if (data.error) {
            
            setTableData([]);
            
            setError(data.error);
        } else if (data.message) {
            const dataRow=[];
            data.message.forEach((arr)=>{
                const val= arr.percent.toString().slice(0, 4);
                dataRow.push(createData(arr.instrument.name, Number(val), arr.instrument.sector_group ));
                  
              }); 
            setTableData(dataRow);
        }
    }
    useEffect(() => {
        fetchOnlineFondData();
    }, [])
  return (
    <Box

        maxWidth={700}
        width={9/10}
        boxShadow={3}
        
        padding={3}
        borderRadius={4}
        margin={"0 auto"}
        >
    <TableContainer component={Card}
    width={9/10}
    padding={3}
    margin={"0 auto"}>
      <Table sx={{ minWidth: 250}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fond</TableCell>
            <TableCell align="right">Andel</TableCell>
            <TableCell align="right">Kategori</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.andel}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}