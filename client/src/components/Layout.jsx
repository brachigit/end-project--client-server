
import { Outlet } from "react-router-dom";
import  NutritionAppBar  from "./NutritionAppBar";
import Options from "./Options";
import {  Typography,Grid,  Box} from '@mui/material';

const Layout = () => {
  return (
    
      <div>
     <header> 
      <Options></Options>
    
        
        </header>
        <main>
        <Outlet />
        </main>  
      <footer></footer>  
     </div>
  );
};

export default Layout;