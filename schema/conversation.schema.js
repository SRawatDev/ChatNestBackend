import mongoose from "mongoose"
const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'users'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'users'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'messages'
        }
    ],
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
export default conversationSchema