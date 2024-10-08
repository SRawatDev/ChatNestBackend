import UserController from "../controller/user.controller.js"
import uploadImageArr from "../controller/imageUpload.controller.js";
import {CreateRoom,userRoom} from "../controller/room.controller.js";
import usermiddleware from "../middleware/user.middleware.js"
import {Router} from "express"
const routes=Router()
routes.post("/signup",UserController.UserSignup);
routes.post("/uploadImage",uploadImageArr)
routes.post("/emailVerify",UserController.verifyEmail)
routes.post("/verifypassword",UserController.checkingpassword)
routes.get("/getUserData",usermiddleware,UserController.UserProfile)
routes.get("/allactiveUser",usermiddleware,UserController.searchingUser)
routes.post("/updateUserProfile",usermiddleware,UserController.userUpdateProfile)
routes.post("/userLogout",usermiddleware,UserController.userLogout)
routes.post("/createRoom",usermiddleware,CreateRoom)
routes.get("/userRoominfo",usermiddleware,userRoom)
routes.get("/getconversation",usermiddleware,UserController.fetchingconversation)
routes.post("/deleteaccount",usermiddleware,UserController.deleteaccount)

export default routes;