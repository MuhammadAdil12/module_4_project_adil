import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './App.css'

import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { SignUp } from './pages/Sign-up-page/SignUp'
import { LogInPage } from "./pages/Login-page/logIn";
import Home from "./pages/Home-page/home"
import { DataPage } from "./pages/data-page/data-page"
import { DocumentationPage } from "./pages/documentationPage/documentationPage"
import { Cal_tracker } from "./pages/cal_tracker_page/cal_tracker"
import { Bmi_calculator  } from "./pages/bmi_calculator/bmi_calculator"
import { Workout_tracker } from "./pages/workout_tracker/workout_tracker"
import { Macro_calculator } from "./pages/Macronutrient-Calculator/macro_calculator"
import { Recipe_section } from "./pages/recipe-section/recipe_section"


const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp/>
  },

  {
    path: "login",
    element: <LogInPage/>
  },
  {
    path: "home",
    element: <Home/>
  },
  {
    path: "dataPage",
    element: <DataPage/>
  },
  {
    path: "documentationPage",
    element: <DocumentationPage/>
  },
  {
    path: "cal_tracker",
    element: <Cal_tracker/>
  },
  {
    path: "bmi_calculator",
    element: <Bmi_calculator />
  },
  {
    path: "workout_tracker",
    element: <Workout_tracker/>
  },
  {
    path: "macro_calculator",
    element: <Macro_calculator/>
  },
  {
    path: "recipe_section",
    element: <Recipe_section/>
  },

]
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
