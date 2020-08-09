const express=require("express");
const router=express.Router()
const mongoose=require("mongoose")
const requirelogin=require("../middlewares/requirelogin")
const user=require('../models/user')


router.post('/search',requirelogin,(req,res)=>{
    let userpattern=new RegExp("^"+req.body.query)
    user.find({email:{$regex:userpattern}})
    .select("-password")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/getuser',requirelogin,(req,res)=>{
    const userid=req.body.userid;
    user.findOne({_id:userid})
    .select("-password")
    .then(user=>res.json({userdata:user}))
    .catch(err=>console.log(err))
})

module.exports=router