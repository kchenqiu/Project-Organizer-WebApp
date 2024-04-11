import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './index.css';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';
import ViewProject from './ViewProject';
import ViewTeam from './ViewTeam';
import CreateTeamRoster from './CreateTeamRoster';
import CreateUserStory from './CreateUserStory';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider , Route } from 'react-router-dom';


const router = createBrowserRouter ([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/SignUp",
    element: <SignUp/>
  },
  {
    path: "/Home",
    element: <Home/>
  },
  {
    path: "/CreateProject",
    element: <CreateProject/>
  },
  {
    path: "/CreateTeam",
    element: <CreateTeam/>
  },
  {
    path: "/ViewProject",
    element: <ViewProject/>
  },
  {
    path: "/ViewTeam",
    element: <ViewTeam/>
  },
  {
    path: "/CreateTeamRoster",
    element: <CreateTeamRoster/>
  },
  {
    path: "/CreateUserStory",
    element: <CreateUserStory/>
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
