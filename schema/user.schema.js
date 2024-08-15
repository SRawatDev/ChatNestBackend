import mongoose from "mongoose"
const userSchema =  new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
    profile_pic : {
        type : String,
        default : ""
    },
    status:{
        type:String,
        enum:["active",'inactive'],
        default:"active",
    },
    is_deleted:{
        type:String,
        enum:["0","1"],
        default:"0"
    },
    tokken:{
        type:String
    }
},{
    timestamps : true
})

export default userSchema