import { useGetTypeQuery } from "./nutritionApiSlice";
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import { MenuItem, FormControl, Select, Box, Typography } from '@mui/material';
import { usePdf } from '../context/PdfProvider';

const Breakfast = () => {
  const { updateMeal } = usePdf();

  const { data: proteinData = [] } = useGetTypeQuery("Dairy Protein");
  const { data: carbData = [] } = useGetTypeQuery("Carbohydrate");

  const [proteinPortion, setProteinPortion] = useState('בחר/י מנה');
  const [carbPortion, setCarbPortion] = useState('בחר/י מנה');

  return (
   
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ארוחת בוקר
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
        {/* מנת חלבון */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}
          >
            מנת חלבון (גבינה)
          </Typography>
          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={proteinPortion}
              onChange={(e) => {
                const value = e.target.value;
                setProteinPortion(prev => prev === value ? 'בחר/י מנה' : value);
                if (value !== 'בחר/י מנה') {
                  updateMeal("breakfast",`מנת חלבון (גבינה): ${value}`);
                  console.log("Breakfast updateMeal:", value);
                }
              }}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>
              {proteinData.map(item => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* מנת פחממה */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}
          >
            מנת פחממה
          </Typography>
          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={carbPortion}
              onChange={(e) => {
                const value = e.target.value;
                setCarbPortion(prev => prev === value ? 'בחר/י מנה' : value);
                if (value !== 'בחר/י מנה') {
                  updateMeal("breakfast",` מנת פחממה: ${value}`);
                  console.log("Breakfast updateMeal:", value);
                }
              }}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>
              {carbData.map(item => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <br/>
      <Outlet />
    </Box>
  );
};

export default Breakfast;
