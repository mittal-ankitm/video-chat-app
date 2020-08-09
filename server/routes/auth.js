const express=require("express");
const router=express.Router()
const mongoose=require("mongoose")
const user=require("../models/user")
const jwt=require("jsonwebtoken")
const {jwt_secret}=require("../keys")
const bcrypt=require("bcrypt")
const requirelogin=require("../middlewares/requirelogin")


router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!email||!password||!name){
        return res.status(422).json({error:"please add all fields"})
    }
    user.findOne({email:email})
    .then((saveduser=>{
        if(saveduser){
            return res.status(422).json({error:"user already exist with this email"})

        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const User=new user({
                email,password:hashedpassword,name,
                pic:pic
            })
            User.save()
            .then(user=>{
                return res.json({message:"saved"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    }))
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{

    const {email,password}=req.body
    if(!email||!password){
        return res.status(422).json({error:"provide email and password"})
    }
    user.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({error:"wrong credentials"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(match=>{
            if(match){
               // res.json({message:"success sign in"})
                
            const token=jwt.sign({_id:saveduser._id},jwt_secret)
             const {_id,name,email,pic}=saveduser
            return res.json({token,user:{_id,name,email,pic}});
            }
            else{
                return res.status(422).json({error:"wrong credentials"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports=router