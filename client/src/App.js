import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import {Routes,Route, Link } from "react-router-dom"
import Register from './features/auth/register'
import Login from './features/auth/login';
import RecipesList from './features/recipes/RecipesList';
import Recipe from './features/recipes/Recipe'
import BMI from './features/BMI/BMI'
import HomePage from "./components/HomePage"
import Cookbook from './features/cookbook/Cookbook';
import Options from './components/Options';
import UserTable from './features/users/UserTable';
import WelcomeDashboard from './components/WelcomeDashboard'
import Breakfast from './features/nutrition/Breakfast';
import Snack from './features/nutrition/Snack';
import Lunch from './features/nutrition/Lunch';
import Dinner from './features/nutrition/Dinner';
import AddIteam from './features/nutrition/AddIteam';
import NutritionLayout from './features/nutrition/NutritionLayout';
import DeleteIteam from './features/nutrition/DeleteIteam';
import { Button } from '@mui/material'
import { PdfProvider } from './features/context/PdfProvider';


function App() {
  return (
    <>
      <Routes>
      
      <Route path ='/' element={<HomePage/>}/>
      <Route path ='/register' element={<Register/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path ='/' element={<Layout/>}>
      <Route path='/recipe/:id' element={<Recipe/>} />
      <Route path ='/recipe' element={<RecipesList/>}/>
      <Route path='/cookbook' element={<Cookbook/>} />
      <Route path='/bmi' element={<BMI/>} />
      <Route path='/options' element={<WelcomeDashboard/>} />
      <Route path='/user' element={<UserTable/>} />
            <Route path="nutritionLayout" element={
            <PdfProvider>
              <NutritionLayout />
            </PdfProvider>
          }>

<Route path="addIteam" element={<AddIteam />} />
<Route path="deleteIteam" element={<DeleteIteam />} />
            {/* ברירת מחדל - הצגת כפתור תפריט */}
            <Route
              index
              element={
                <main>
                  <Button
                    component={Link}
                    to="breakfast"
                    variant="contained"
                    color="success"
                    sx={{ mt: { xs: 1, sm: 0 } }}
                  >
                    הצגת התפריט
                  </Button>
                </main>
              }
            />
            {/* ארוחות */}
            <Route path="breakfast" element={<Breakfast />}>
              <Route
                index
                element={
                  <main>
                    <Button component={Link} to="snack" variant="contained">
                      המשך
                    </Button>
                  </main>
                }
              />

              <Route path="snack" element={<Snack />}>
                <Route
                  index
                  element={
                    <main>
                      <Button component={Link} to="lunch" variant="contained">
                        המשך
                      </Button>
                    </main>
                  }
                />

                <Route path="lunch" element={<Lunch />}>
                  <Route
                    index
                    element={
                      <main>
                        <Button component={Link} to="snack" variant="contained">
                          המשך
                        </Button>
                      </main>
                    }
                  />

                  <Route path="snack" element={<Snack />}>
                    <Route
                      index
                      element={
                        <main>
                          <Button component={Link} to="dinner" variant="contained">
                            המשך
                          </Button>
                        </main>
                      }
                    />
                    <Route path="dinner" element={<Dinner />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

      </Route>
      </Routes>
    </>
  );
}

export default App;
