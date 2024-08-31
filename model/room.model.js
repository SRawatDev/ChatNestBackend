import roomschema from "../schema/room.schema.js";
import mongoose from "mongoose";
const roommodel=mongoose.model("room",roomschema)
export default roommodel