import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {usercontext} from '../App'
import icon from '../img/icon.png'
import './stylesheet/style.css'
import Home from './screens/home'
const NavBar=()=> {

    const{state,dispatch}=useContext(usercontext) 
    const history=useHistory()
    const renderlist=()=>{
        if(state){
            return [
                <li key='0'><img src={icon} height='50px' width='50px' /></li>,
                
                   
                <li key="4">
                    <button onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}>
                        logout
                    </button>
                </li>
            ]
        }else{
            return [
                <li key='6'><img src={icon} height='50px' width='50px' /></li>,
                <li key="7"><Link to="/signin">sign in</Link></li>,
                  <li key="8"><Link to="/signup">sign up</Link></li>
            ]
        }
    }
    return (
      <nav>
          <div>
              
              <ul>
                  {renderlist()}
              </ul>
          </div>
      </nav>
    );
  }
  
  export default NavBar;