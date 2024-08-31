import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import mongoose from "mongoose";
const secretKey = "sumitrawat";
const VerifyToken = async (request, response, next) => {
  try {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader) {
      return response.status(401).json({ status: false, message: "Token not present." });
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return response.status(401).json({ status: false, message: "Token not present." });
    }
    jwt.verify(token, secretKey, async (err, auth) => {
      if (err) {
        return response.status(401).json({ status: false, message: "Invalid token." });
      }
      const userData = await userModel.findOne(
        { _id: new mongoose.Types.ObjectId(auth._id) },
        { status: 0, is_deleted: 0,createdAt:0,updatedAt:0,password:0 }
      );
      if (!userData) {
        return response.status(404).json({ status: false, message: "User does not exist." });
      }

      if (userData.status === "inactive") {
        return response.status(403).json({ status: false, message: "User is blocked. Please contact the admin." });
      }
      request.UserData = userData;
      next();
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export default VerifyToken;
