import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useGetRecipeSortByDateQuery,useGetRecipeSortByNameQuery} from './recipeApiSlice'

const SortRecipe=({setRecipe,sortValue, setSortValue})=> {
  const { data: recipesDateQuery, error:dateErr, isLoading:isLoadDate, isSuccess:isSuccessDate, isError:isErrorDate } = useGetRecipeSortByDateQuery();
  const { data: recipesNameQuery, error:nameErr, isLoading:isloadName, isSuccess:isSucceessName, isError:isErrorName } = useGetRecipeSortByNameQuery();

  const handleChange = (event) => {
    const selected = event.target.value;
    setSortValue(selected);
   if(selected=="name"&&isSucceessName){
      setRecipe(recipesNameQuery)
   }
   if(selected=="date"&&isSuccessDate){
      setRecipe(recipesDateQuery)
   }

  };

  return (
    <Box sx={{   minWidth: 150}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">מיין</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort"
          value={sortValue}
          onChange={handleChange}
        >
          <MenuItem value="">מיין</MenuItem>
          <MenuItem value={"name"}>לפי שם</MenuItem>
          <MenuItem value={"date"}>מהחדש לישן</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortRecipe
