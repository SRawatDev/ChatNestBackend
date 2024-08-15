import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import moveimage from "../helper/moveimage.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const userService = {};
userService.Register = async (request) => {
    const checkingEmail = await userModel.findOne({ email: request.body.email });
    if (checkingEmail) {
        return { message: 'User already exists with this email', status: false };
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = bcrypt.hashSync(request.body.password, salt); 
    request.body.password = hashpassword;

    const data = new userModel(request.body);
    await data.save();
    await moveimage.moveFileFromFolder(request.body.profile_pic,"images")
    return { message: 'User is registered successfully', status: true };
};

userService.verifyEmail=async(request)=>{
    if(!await userModel.findOne({email:request.body.email}).select("-password"))
    {
        return {message:"Email is not register",status:false}
    }
    return {message:"user email verify sucessfully",status:true}
}
userService.verifyPassword=async(request)=>{
    const userData=await userModel.findOne({_id:new mongoose.Types.ObjectId(request.body.userId)},{email:1,password:1,name:1,tokken:1})
    if(!userData)
    {
        return {message:"user is not exist", status:false}
    }
    if(!await bcrypt.compare(request.body.password,userData.password)){
        return {message:"password is incorrect",status:false}
    }
    const data=jwt.sign(userData.toObject(),"sumitrawat")
    userData.tokken=data;
    return {message:"Password is correct", data:userData,status:true}
}
userService.getUserData=async(request)=>{
    const data=request.UserData;
    return {message:"User Data",status:true,Data:data}
    
}
userService.searchingUser=async(request)=>{
    const UserName=request.query.search;
    const regex=new RegExp(UserName,"i")
    const data=await userModel.find({name:regex,status:"active"},{password:0,status:0,is_deleted:0})
    return {message:"listing of all user",status:true,data:data}

}
userService.updateUserProfile=async(request)=>{
    const userData=await userModel.findOne({_id:new mongoose.Types.ObjectId(request.query.userId),status:"active"})
    if(!userData)
    {
        return{ message:"user not exist", status:false}

    }
    if(request.body.profile_pic &&  request.body.profile_pic!=userData.profile_pic){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const uploadfilePath = path.join(__dirname, "../../public/images/" + userData.profile_pic);
        if(fs.existsSync(uploadfilePath)) {
            await fs.unlinkSync(uploadfilePath);
        }
        await moveimage.moveFileFromFolder(request.body.profile_pic,"images")
    }
    await userModel.findByIdAndUpdate({_id:new mongoose.Types.ObjectId(request.query.userId)},request.body)
    return{ message:"User Profile Updated Sucessfully", status:true }

}



export default userService;
