import React,{useEffect,createContext,useReducer,useContext} from 'react';
import { BrowserRouter, Route, Switch ,useHistory } from "react-router-dom";

import NavBar from "./components/navbar"
import Home from './components/screens/home'
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'


import {initialstate,reducer} from './reducers/userreducer'
export const usercontext=createContext()

const Routing=()=>{
  const history=useHistory() 
  const {state,dispatch}=useContext(usercontext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
     
    }
    else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>

        </Switch>
  )
}



function App() {
   const [state,dispatch]=useReducer(reducer,initialstate)

  return (
    <usercontext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>
    <Routing />
    </BrowserRouter>
    </usercontext.Provider>

  );
  }
export default App;
