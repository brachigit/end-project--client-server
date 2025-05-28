import { useGetTypeQuery } from "./nutritionApiSlice";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {Select,Box,FormControl,MenuItem,Typography} from '@mui/material'
import {usePdf} from '../context/PdfProvider.jsx'


const Lunch = () => {
   
  const {updateMeal } = usePdf();

  const { data = [], error, isLoading, isSuccess, isError } = useGetTypeQuery("Fat");
  const carbResult = useGetTypeQuery("Carbohydrate");
  const meat_ProteinResult=useGetTypeQuery("Meat Protein")


  const [fat_Portion, setFat_Portion] = useState('בחר/י מנה');
  const [carb, setCarb] = useState('בחר/י מנה')
  const [meat_Protein,setMeat_Protein]= useState('בחר/י מנה')

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ארוחת צהריים
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

        {/* מנת שומן */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
            מנת שומן
          </Typography>

          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={fat_Portion}
              onChange={(e) => {
                setFat_Portion(prev => prev === e.target.value ? 'בחר/י מנה' : e.target.value);
                if (e.target.value !== 'בחר/י מנה') {
                  updateMeal("lunch",`מנת שומן: ${e.target.value}`);
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

        {/* מנת פחממה */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
            מנת פחממה
          </Typography>

          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={carb}
              onChange={(e) => {
                setCarb(prev => prev === e.target.value ? 'בחר/י מנה' : e.target.value)
                if (e.target.value !== 'בחר/י מנה') {
                  updateMeal("lunch",` מנת פחממה: ${e.target.value}`)
              }}}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>

              {(carbResult?.data || []).map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
    
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
             מנת חלבון בשרי
          </Typography>

          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={meat_Protein}
              onChange={(e) => {
                setMeat_Protein(prev => prev === e.target.value ? 'בחר/י מנה' : e.target.value)
                if (e.target.value !== 'בחר/י מנה') {
                  updateMeal("lunch",`מנת חלבון בשרי: ${e.target.value}`)
              }}}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>

              {(meat_ProteinResult.data || []).map((item) => (
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
    <Outlet/>
      </Box>
  );
};

export default Lunch
