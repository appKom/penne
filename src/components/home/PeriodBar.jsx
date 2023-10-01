import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export default function PeriodBar(props) {
    const buttons = [
        ["5Y", "y5"],
        ["3Y", "y3"],
        ["1Y", "y1"],
        ["TY", "ty"],
        ["6M", "m6"],
        ["3M", "m3"],
        ["1M", "m1"],
        ["1W", "w1"]
    ]
    return <Box
    maxWidth={700}

    display={'flex'}
    flexDirection={'row'}
    justifyContent={'space-between'}
    padding={
        "20px"
    }
    width={1 - "20px"}
    >
     
       {buttons.map((button) => 
       <Button onClick={() => props.setPeriod(button[1])}>{button[0]}</Button>)}

    </Box>
}