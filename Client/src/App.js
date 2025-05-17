import './App.css';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Layout from './Componenet/layout'
import Login from './featuers/auth/login'
import Register from './featuers/auth/register'


function App() {
  return (
    < Router>
 <Routes>
   <Route path='/' element={<Layout/>}>
   <Route index element={<Register/>} />
   </Route>
 </Routes>
 </Router>
  )
}

export default App;
