import { useState } from 'react'
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
//import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip, ResponsiveContainer, LabelList,} from 'recharts';

const BMI=()=>{

const [val,setVal]=useState({Age:0, Height:0 ,Weight:0})



const To_calculate=()=>{

const bmi=val.Weight/((val.Height/100)*(val.Height/100))

//alert(BMI=${bmi.toFixed(1)}) 
console.log(bmi)
}

return(
    <div dir="rtl">

<Stack  sx={{ justifyContent: 'center', 
alignItems: 'center', display: 'flex' }} spacing={5} direction="column">

<Stack spacing={1} direction="column" alignItems="center" sx={{ width: '50vh' }}>
<Typography id="1"  sx={{ mb: 1 }}>Age</Typography>

<Slider
       aria-labelledby="1"
        aria-label="Temperature"
        value={val.Age}
        valueLabelDisplay="on"
        defaultValue={30}
        min={19}
        max={120}
        onChange={(event)=>{setVal({...val,Age:(event.target.value)})
    }}
 /></Stack>


<Stack spacing={1} direction="column" alignItems="center" sx={{ width: '50vh' }}>
<Typography id="2"  sx={{ mb: 1 }}>Height</Typography>

<Slider
        aria-labelledby="2"
        aria-label="Temperature"
        value={val.Height}
        valueLabelDisplay="on"
        defaultValue={30}
        min={0}
        max={190}
        onChange={(event)=>{setVal({...val,Height:(event.target.value)})
    }}
        
      /></Stack>


<Stack spacing={1} direction="column" alignItems="center" sx={{ width: '50vh' }}>
<Typography id="3"  sx={{ mb: 1 }}>Weight</Typography>
<Slider
        aria-labelledby="3"
        aria-label="Temperature"
        value={val.Weight}
        valueLabelDisplay="on"
        defaultValue={30}
        min={0}
        max={150}
        onChange={(event)=>{setVal({...val,Weight:(event.target.value)})
    }}
        
      /></Stack>
  <Button onClick={To_calculate}  variant="contained">חישוב ה-BMI שלי</Button>

</Stack>
</div>
)
}

export default BMI