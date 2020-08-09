
import React,{ useState ,useContext  } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {usercontext} from '../../App'
const Signin= ()=>{
    const{state,dispatch}=useContext(usercontext)
    const history=useHistory()
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [msg,setmsg]=useState("")

    const postdata=()=>{
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                setmsg(data.error)
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                history.push('/')
            }
        })
    }

return(

    <div style={{margin:100+'px'}}>
         <input type='text' placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)} style={{margin:20+'px'}} /><br />
    <input type='password' placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} style={{margin:20+'px'}}  /><br />
   <button onClick={()=>postdata()} style={{margin:20+'px'}} >login</button><br />
        <Link to='/signup' style={{margin:20+'px'}} >sign up</Link>
    </div>


)

}

export default Signin