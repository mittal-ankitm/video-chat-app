import React,{ useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import { useHistory } from 'react-router-dom'
const Signup = ()=>{
    const history=useHistory()
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [msg,setmsg]=useState("")
    const [image,setimage]=useState("")
    const [url,seturl]=useState(undefined)

    useEffect(()=>{
        if(url){
            uploadfields();
        }
    },[url])

    const uploadpic=()=>{
        const data=new FormData()
        data.append("file",image )
        data.append("upload_preset","image-sharing")
        data.append("cloud_name","abcdab123")
        fetch("https://api.cloudinary.com/v1_1/abcdab123/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            seturl(data.url)
        }).catch(err=>{
            console.log(err)
        })

    }

    const uploadfields=()=>{
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                setmsg(data.error)
            }
            else{
                history.push('/signin')
            }
        })
    }

    const postdata=()=>{

        if(image){
            uploadpic()
        }else{

        }

        
    }

return(

    <div>
        <input value={msg} />
        <input type='text' placeholder='name' value={name} onChange={(e)=>setname(e.target.value)} />
    <input type='text' placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)} />
    <input type='password' placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} />
    
    < input type='file' onChange={(e)=>setimage(e.target.files[0])} />
        
    
    <button onClick={()=>postdata()}>sign up</button>

    <Link to='/signin'>sign in</Link>
</div>

)

}

export default Signup