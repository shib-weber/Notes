const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
    },
},{timestamps:true})

const User = mongoose.model("noteUser",userSchema)


module.exports= {User}