const express=require('express');
const {mongourl} = require("./keys")
app=express();
const mongoose=require("mongoose")
const port=5000
var cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cors())
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})


mongoose.connection.on('connected',()=>{
   // console.log("connected mongodb");
})

mongoose.connection.on('error',()=>{
    //console.log("error connecting database");
})

const user=require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/user'))

    io.on('connection', socket => {
        socket.on("join",(userid)=>{
        
        socket.join(userid)
        })

        socket.on("call-rejected",(userid)=>{
            socket.to(userid).broadcast.emit('call-got-rejected')
        })
        socket.on('call-user', (userid, toid) => {
        socket.to(toid).broadcast.emit('calling', userid)
    
        socket.on('disconnect', () => {
            socket.to(toid).broadcast.emit('call-disconnect', userid)
        })
        })

        socket.on("disconnect-call",(userid,toid)=>{
            socket.to(userid).broadcast.emit("call-disconnect")
            socket.to(toid).broadcast.emit("call-disconnect")
        })
    })
  

  server.listen(port)