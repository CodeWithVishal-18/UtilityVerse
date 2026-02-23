import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./App.css";

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './Home';
import Todo from './Todo';
import Quiz from './Quiz';
import ThemeProvider from './context/ThemeContext';
import TextFormatter from './TextFormatter.jsx';
import QuizSection from './quizcategory/QuizSection.jsx';
import JobApplied from './JobApplied.jsx';
import MyStats from './MyStats.jsx';
import Ekagr from './Ekagr.jsx';

let myroutes=createBrowserRouter([
  {path:"/",element:<App/>,children:[
    {index:true,element:<Home/>},
    {path:"/todo",element:<Todo/>},
    {path:"/quiz",element:<Quiz/>},
    {path:"/ekagr",element:<Ekagr/>},
    {path:"/quiz/:tech",element:<QuizSection/>},
    {path:"/textformatter",element:<TextFormatter/>},
    {path:"/jobdashboard",element:<JobApplied/>},
    {path:"/mystats",element:<MyStats/>},
    {path:"*",element:<Navigate to="/" replace/>}
  ]}
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ThemeProvider><RouterProvider router={myroutes}/></ThemeProvider>);
