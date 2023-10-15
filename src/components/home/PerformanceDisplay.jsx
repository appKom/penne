import { useEffect, useState } from "react"
import PerformanceChart from "./PerformanceChart";
import PeriodBar from "./PeriodBar";
import Box from '@mui/material/Box';

export default function PerformanceDisplay ()  {

    const [performanceData, setPerformanceData] = useState([]);
    const [osebxData, setOsebxData] = useState([]);
    const [period, setPeriod] = useState("y5");

    const setError = (message) => {
    }

    const fetchOnlineFondData = async () => {
        const data = await fetch('/api/fonddata/getperformance').then((res) => res.json());
        if (data.error) {
            
            setPerformanceData([]);
            
            setError(data.error);
        } else if (data.message) {
            setPerformanceData(data.message);
            
            
        }
    }

    const fetchOsebxData = async () => {
        const data = await fetch('/api/osebx/getperformance').then((res) => res.json());
        if (data.error) {
            setOsebxData([]);
            
            setError(data.error);
        } else if (data.message) {
        
            setOsebxData(data.message);
            
            
        }
    }

    useEffect(() => {
        fetchOnlineFondData();
        fetchOsebxData();
    }, [])

  
    return (
    <Box
   
    maxWidth={700}
    width={9/10}
    border={""}

    
    className='performance_display_container'
    
    padding={3}
    borderRadius={4}
    margin={"0 auto"}
    >
      <PerformanceChart data={performanceData} osebxdata={osebxData} period={period}/>
      <PeriodBar setPeriod={setPeriod}/>
      </Box>
    )
  }