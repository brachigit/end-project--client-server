import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import {Routes,Route} from "react-router-dom"
import Register from './features/auth/register'
import Login from './features/auth/login';
import RecipesList from './features/recipes/RecipesList';
import Recipe from './features/recipes/Recipe'
import BMI from './features/BMI/BMI'

function App() {
  return (
    <>
      <Routes>
      <Route path ='/' element={<Layout/>}>
      <Route path ='/register' element={<Register/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/recipe' element={<RecipesList/>}/>
      <Route path='/recipe/:id' element={<Recipe/>} />
      <Route path='/bmi' element={<BMI/>} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
