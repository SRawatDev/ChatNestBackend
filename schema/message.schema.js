import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
    text : {
        type : String,
        default : ""
    },
    imageUrl : {
        type : String,
        default : ""
    },
    videoUrl : {
        type : String,
        default : ""
    },
    seen : {
        type : Boolean,
        default : false
    },
    msgByUserId : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'users'
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
    }
},{
    timestamps : true
})

export default messageSchema