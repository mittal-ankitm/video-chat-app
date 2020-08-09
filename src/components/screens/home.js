import React,{useEffect,useState,useContext,useRef} from 'react'
import {usercontext} from '../../App'
import {useParams,Link, useHistory} from 'react-router-dom'
import recieveimg from '../../img/recieve.png'
import rejectimg from '../../img/reject.png'
import io from "socket.io-client";
import Peer from 'peerjs'
const Home= ()=>{

    const [query,setquery]=useState("")
    const [details,setdetails]=useState([])
    const{state,dispatch}=useContext(usercontext)
   const [callinguser,setuser]=useState("")
    const [gotcalluser,setgotcall]=useState({})
    const history=useHistory()
    const socket = useRef();
    const userid=useRef();

    useEffect(()=>{
            const us=JSON.parse(localStorage.getItem("user"))
            if(us)
            userid.current=us._id;
            socket.current = io('http://localhost:5000/')
            socket.current.emit('join',userid.current)
        const myPeer = new Peer(userid.current, {
            host: 'localhost',
            path:'/',
            port: '5001'
        })
        let peer
        const myVideo = document.getElementById('v1')
        myVideo.muted = true
        navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
        }).then(stream => {
                            myVideo.srcObject = stream
                            myVideo.addEventListener('loadedmetadata', () => {
                                myVideo.play()
                    })

                    myPeer.on('call', call => {
                    call.answer(stream)
                    const video = document.getElementById('v2')
                    call.on('stream', userVideoStream => {
                        video.srcObject = userVideoStream
                    video.addEventListener('loadedmetadata', () => {
                    video.play()
                    })
                    })
                    })

                    socket.current.on('calling', userId => {
                    
                    getusercalling(userId);
                    const c=window.confirm("accept call ?")
                    if(c)
                    connectToNewUser(userId,stream)
                    else
                    socket.current.emit("call-rejected",userId)
                    })
                })

        socket.current.on("call-got-rejected",()=>{
            

        })

        socket.current.on('call-disconnect', userId => {
            if (peer) peer.close()
            console.log("ger")
            window.location.reload()
        })

        myPeer.on('open', id => {
            socket.current.emit('join',userid.current)
        })

        const connectToNewUser = (userId, stream)=> {
                const call = myPeer.call(userId, stream)
                const video = document.getElementById('v2')
                call.on('stream', userVideoStream => {
                    video.srcObject = userVideoStream
                    video.addEventListener('loadedmetadata', () => {
                    video.play()
                })
            })
                call.on('close', () => {
                video.remove()
                })
                peer = call
            }
        

        const addVideoStream = (video, stream) => {
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
            video.play()
            })
        }

        

    },[])


    const makecall=()=>{
    
    const toval=document.getElementById('tocaller').value;
    const i=details.filter(user=>user.email==toval)
    const toid=i[0]._id;
    socket.current.emit('call-user', userid.current, toid)
    console.log(userid.current,toid)
  
  }
    

  const getusercalling=(userid)=>{
    fetch('http://localhost:5000/getuser',{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({userid})
    }).then(res=>res.json())
    .then(result=>{
        setuser(result.userdata)
        console.log(result.userdata)
    })
  }

    const searchuser=(text)=>{
        setquery(text)
        fetch('http://localhost:5000/search',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({query})
        }).then(res=>res.json())
        .then(result=>{
            setdetails(result.user)
            console.log(details)
        })

        

    }

    const disconnectcall=()=>{
        socket.current.emit("disconnect-call",userid.current,callinguser._id)
    }
    
    
    return(
        <div>
                <div>
                        <input type='text' list='userslist' id='tocaller' onChange={(e)=>searchuser(e.target.value)} placeholder='search' />
                    <img src={recieveimg} height='50px' width='50px' onClick={()=>{makecall()}} />
                    <div>
                        <datalist id='userslist'>

                            {
                                details.map(userdata=>{
                                    return(
                                    <option value={userdata.email} >{userdata.email}</option>
                                    )
                                })
                            }
                        </datalist>
                    </div>
                </div>
                <div>
                    <video id='v2'  height='300px' width='500px' />
                    <video id='v1'  height='100px' width='160px' />
                    <img src={rejectimg} onClick={()=>disconnectcall()} height='50px' width='50px' />
                </div>

                <div>

                        <section>
                            <img src={callinguser.pic} height='50px' width='50px' />
                            {callinguser.name}<br />

                            {callinguser.email}
                        </section>

                </div>




        </div>
    )

    }
export default Home