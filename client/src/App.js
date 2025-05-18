import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import {Routes,Route} from "react-router-dom"
import Register from './features/auth/register'
import Login from './features/auth/login';
import RecipesList from './features/recipes/RecipesList';

function App() {
  return (
    <>
      <Routes>
      <Route path ='/' element={<Layout/>}>
      <Route path ='/register' element={<Register/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/recipes' element={<RecipesList/>}/>
      </Route>
      </Routes>
    </>
  );
}

export default App;
