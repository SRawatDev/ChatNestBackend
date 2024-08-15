import messageSchema from "../schema/message.schema.js";
import mongoose from "mongoose";
const messageModel=mongoose.model("messages",messageSchema)
export default messageModel