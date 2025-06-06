import {useGetTypeQuery } from "./nutritionApiSlice"
import { useState  } from "react"
import { Outlet } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box';
import { usePdf } from '../context/PdfProvider.jsx'



const Snack=()=>{

  const {  updateMeal } = usePdf();


const {data=[], error, isLoading,isSuccess,isError }=useGetTypeQuery("Fat")
 const Fruit_Result=useGetTypeQuery("Fruit ")


const [fat_Portion, setFat_Portion] =useState('בחר/י מנה')
const [fruit, setFruit] = useState('בחר/י מנה')


  
    return(
        <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ארוחת ביניים
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          mt: 3,
        }}
      >
        {/* מנת פרי*/}
        <Box>

          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
      
            מנת פרי
          </Typography>

          <FormControl sx={{ minWidth: 250 }}>
            
            <Select
              value={fruit}
              onChange={(e) => {
              setFruit(prev => prev === e.target.value ? 'בחר/י מנה' : e.target.value)
              if (e.target.value !== 'בחר/י מנה') {
                updateMeal("snack",` מנת פרות: ${e.target.value}`);
              }}
              }>

              <MenuItem  value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>

              {(Fruit_Result.data|| []).map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
    
        </Box>
        {/* מנת שומן*/}
        <Box>

          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
            מנת שומן
          </Typography>

          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={fat_Portion }
              onChange={(e) => {
                setFat_Portion(prev => prev === e.target.value ? 'בחר/י מנה' : e.target.value)
                if (e.target.value !== 'בחר/י מנה') {
                  updateMeal("snack",`מנת שומן: ${e.target.value}`);
                }}}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>

              {(data || []).map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Box>
      </Box>
      <br/>
      <br/>
       <Outlet />
    </Box>
    )
}

export default Snack
