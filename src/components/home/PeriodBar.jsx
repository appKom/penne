
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PeriodBar(props) {
    const buttons = [
        ["5Y", "y5"],
        ["3Y", "y3"],
        ["1Y", "y1"],
        ["6M", "m6"],
        ["3M", "m3"],
        ["1M", "m1"],
        ["1W", "w1"]
    ]
    return <Box
    maxWidth={700}

    display={'flex'}
    flexDirection={'row'}
    justifyContent={'space-around'}
    padding={
        "10px"
    }
    className='period_bar_container'
    width={1 - "20px"}
    >
     
       {buttons.map((button) => 
       <Button
       key={button[1]}
       className='period_button'
        
       onClick={() => props.setPeriod(button[1])}>{button[0]}</Button>)}

    </Box>
}