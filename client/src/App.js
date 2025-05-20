import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import {Routes,Route} from "react-router-dom"
import Register from './features/auth/register'
import Login from './features/auth/login';
import RecipesList from './features/recipes/RecipesList';
import Recipe from './features/recipes/Recipe'
import BMI from './features/BMI/BMI'
import HomePage from "./components/HomePage"
import Cookbook from './features/cookbook/Cookbook';
import ManagerOptions from './features/managerOptions/ManagerOptions';

function App() {
  return (
    <>
      <Routes>
      <Route path ='/' element={<Layout/>}>
      <Route path ='/' element={<HomePage/>}/>
      <Route path ='/register' element={<Register/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/recipe' element={<RecipesList/>}/>
      <Route path='/recipe/:id' element={<Recipe/>} />
      <Route path='/cookbook' element={<Cookbook/>} />
      <Route path='/bmi' element={<BMI/>} />
      <Route path='/manager' element={<ManagerOptions/>} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
