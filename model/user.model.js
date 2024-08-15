import userSchema from "../schema/user.schema.js";
import mongoose from "mongoose";
const userModel=mongoose.model("users",userSchema)
export default userModel