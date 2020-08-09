import React,{useEffect,useState,useContext} from 'react'
import {usercontext} from '../../App'
import {useParams,Link} from 'react-router-dom'

const Home= ()=>{
    const [query,setquery]=useState("")
    const [details,setdetails]=useState([])
    const{state,dispatch}=useContext(usercontext)
   

    return(
        <div>
        
        
        </div>
    )

    }
export default Home