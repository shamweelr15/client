import React, {createContext, useReducer} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from "./components/Errorpage"
import Logout from "./components/Logout"
import Nutrition from "./components/NutritionPage"
import Activity from "./components/ActivityPage"
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { initalState, reducer } from '../src/reducer/UserReducer';
export const UserContext = createContext();

const Routing =()=>{
  return(
    <>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/nutrition" element={<Nutrition />} />
    <Route path="/activity" element={<Activity />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="*"element={<Errorpage/>}/>
    </Routes>
    </>
  );
}

const App=()=> {

  const  [state,dispatch] =useReducer(reducer, initalState)
 
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routing />
    </UserContext.Provider>
    </>
  )
}

export default App
