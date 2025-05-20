
import { Outlet } from "react-router-dom";
import  NutritionAppBar  from "./NutritionAppBar";

const Layout = () => {
  return (
    
      <div>
     <header><NutritionAppBar/></header>
        <main>
        <Outlet />
        </main>  
      <footer><h3>Be happy!!</h3></footer>  
     </div>
  );
};

export default Layout;