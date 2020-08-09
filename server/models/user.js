const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/abcdab123/image/upload/v1595419542/blank-profile-picture-973460_1280_jpyfld.png"
    }
})

module.exports=mongoose.model("user",userSchema);
