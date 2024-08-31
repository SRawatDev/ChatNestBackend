import mongoose from "mongoose"
const roomschema =  new mongoose.Schema({
    name: String,
    image:String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }],
},{
    timestamps : true
})

export default roomschema