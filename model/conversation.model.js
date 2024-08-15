import mongoose from "mongoose";
import conversationSchema from "../schema/conversation.schema.js";
const conversationModel=mongoose.model("conversations",conversationSchema)
export default conversationModel