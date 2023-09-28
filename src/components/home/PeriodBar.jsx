import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export default function PeriodBar(props) {
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
     
        <Button variant="outlined" onClick={() => {props.setPeriod("y5")}} >5Y</Button>
        <Button variant="outlined" onClick={() => {props.setPeriod("y3")}} >3Y</Button>
        <Button variant="outlined" onClick={() => {props.setPeriod("y1")}} >1Y</Button>
      <Button variant="outlined" onClick={() => {props.setPeriod("ty")}} >TY</Button>
      <Button variant="outlined" onClick={() => {props.setPeriod("m6")}} >6M</Button>
        <Button variant="outlined" onClick={() => {props.setPeriod("m3")}} >3M</Button>
        <Button variant="outlined" onClick={() => {props.setPeriod("m1")}} >1M</Button>
        <Button variant="outlined" onClick={() => {props.setPeriod("w1")}}  >1W</Button>
     

    </Box>
}