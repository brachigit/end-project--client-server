import { useGetTypeQuery } from "./nutritionApiSlice";
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import { Select, Box, FormControl, MenuItem, Typography } from '@mui/material';
import { usePdf } from '../context/PdfProvider.jsx';

const Dinner = () => {
  const { updateMeal } = usePdf();

  const { data: fatData = [] } = useGetTypeQuery("Fat");
  const { data: carbData = [] } = useGetTypeQuery("Carbohydrate");
  const { data: dairyProteinData = [] } = useGetTypeQuery("Dairy Protein");

  const [dairyProtein, setDairyProtein] = useState('בחר/י מנה');
  const [carb, setCarb] = useState('בחר/י מנה');
  const [fatPortion, setFatPortion] = useState('בחר/י מנה');

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        ארוחת ערב
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
        {/* מנת חלבון חלבית */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
            מנת חלבון (גבינה)
          </Typography>
          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={dairyProtein}
              onChange={(e) => {
                const value = e.target.value;
                setDairyProtein(prev => prev === value ? 'בחר/י מנה' : value);
                if (value !== 'בחר/י מנה') {
                  updateMeal("dinner",`מנת חלבון (גבינה): ${value}`);
                }
              }}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>
              {dairyProteinData.map((item) => (
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
                const value = e.target.value;
                setCarb(prev => prev === value ? 'בחר/י מנה' : value);
                if (value !== 'בחר/י מנה') {
                  updateMeal("dinner",`מנת פחממה: ${value}`);
                }
              }}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>
              {carbData.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* מנת שומן */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontStyle: 'italic', fontWeight: 500 }}>
            מנת שומן
          </Typography>
          <FormControl sx={{ minWidth: 250 }}>
            <Select
              value={fatPortion}
              onChange={(e) => {
                const value = e.target.value;
                setFatPortion(prev => prev === value ? 'בחר/י מנה' : value);
                if (value !== 'בחר/י מנה') {
                  updateMeal("dinner",`מנת שומן: ${value}`);
                }
              }}
            >
              <MenuItem value="בחר/י מנה">
                <em>בחר/י מנה</em>
              </MenuItem>
              {fatData.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <br />
      <br />
      <Outlet />
    </Box>
  );
};

export default Dinner;
