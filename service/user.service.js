import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import moveimage from "../helper/moveimage.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const userService = {};
userService.Register = async (request) => {
  const checkingEmail = await userModel.findOne({ email: request.body.email });
  if (checkingEmail) {
    return { message: "User already exists with this email", status: false };
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = bcrypt.hashSync(request.body.password, salt);
  request.body.password = hashpassword;

  const data = new userModel(request.body);
  await data.save();
  await moveimage.moveFileFromFolder(request.body.profile_pic, "images");
  return { message: "User is registered successfully", status: true };
};

userService.verifyEmail = async (request) => {
  const data = await userModel
    .findOne({ email: request.body.email },{_id:1})
    .select("-password");
  if (!data) {
    return { message: "Email is not register", status: false };
  }
  return { message: "user email verify sucessfully", status: true, data: data };
};
userService.verifyPassword = async (request) => {
  const userData = await userModel.findOne(
    { _id: new mongoose.Types.ObjectId(request.body.userId) },
    { email: 1, password: 1, name: 1, tokken: 1,profile_pic:1 }
  );
  if (!userData) {
    return { message: "user is not exist", status: false };
  }
  if (!(await bcrypt.compare(request.body.password, userData.password))) {
    return { message: "password is incorrect", status: false };
  }
  const data = jwt.sign(userData.toObject(), "sumitrawat");
  userData.tokken = data;
  return { message: "Password is correct", data: userData, status: true };
};
userService.getUserData = async (request) => {
  const data = request.UserData;
  return { message: "User Data", status: true, Data: data };
};
userService.searchingUser = async (request) => {
  const userData=request.UserData;
  console.log('====',userData)
  const UserName = request.query.search;
  const regex = new RegExp(UserName, "i");
  const data = await userModel.find(
    {
      name: regex, 
      status: "active", 
      _id: { $ne: userData?._id }
    },
    {
      password: 0, 
      status: 0, 
      is_deleted: 0, 
      createdAt: 0, 
      updatedAt: 0, 
      __v: 0 
    }
  );
  
  return { message: "listing of all user", status: true, data: data };
};
userService.updateUserProfile = async (request) => {
  const userData = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(request.body.userId),
    status: "active",
  });
  if (!userData) {
    return { message: "user not exist", status: false };
  }

  await moveimage.moveFileFromFolder(request.body.profile_pic, "images");

  const data=await userModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(request.body.userId), // First parameter is the ID
    request.body, // Second parameter is the update data
    { new: true } // Options object, where `new: true` returns the updated document
  ).select("-password");
  
  return { message: "User Profile Updated Sucessfully", status: true,Data:data };
};

export default userService;
