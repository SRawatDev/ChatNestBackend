import express from "express";
import { Server } from "socket.io";
import http from "http";
import getUserInfo from "../helper/getUserInfo.js"; // Place all imports at the top
import userModel from "../model/user.model.js";
import conversationModel from "../model/conversation.model.js";
import messageModel from "../model/message.model.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
    console.log("Connected user", socket.id);
    const token = socket.handshake.auth.token;
  
    try {
      const userdata = await getUserInfo(token);
      socket.join(userdata?._id);
      onlineUser.add(userdata?._id);
      io.emit("onlineUser", Array.from(onlineUser));
  
      socket.on("message-page", async (userId) => {
        try {
          const userDetail = await userModel.findOne(
            { _id: userId },
            { _id: 1, name: 1, email: 1, profile_pic: 1 }
          );
          const payload = {
            _id: userDetail?._id,
            name: userDetail?.name,
            email: userDetail?.email,
            profile_pic: userDetail?.profile_pic,
            online: onlineUser.has(userId),
          };
          socket.emit("messageUser", payload);
  
          // Get previous message
          const getConversationMessage = await conversationModel
            .findOne({
              $or: [
                { sender: userdata?._id, receiver: userId },
                { sender: userId, receiver: userdata?._id },
              ],
            })
            .populate("messages")
            .sort({ updatedAt: -1 });
  
          socket.emit("message", getConversationMessage?.messages || []);
        } catch (error) {
          console.error("Error in message-page event:", error.message);
          socket.emit("error", "Failed to load user messages.");
        }
      });
  
      socket.on("new message", async (data) => {
        try {
          let conversation = await conversationModel.findOne({
            $or: [
              { sender: data?.sender, receiver: data?.reciever },
              { sender: data?.reciever, receiver: data?.sender },
            ],
          });
  
          if (!conversation) {
            conversation = await conversationModel.create({
              sender: data?.sender,
              receiver: data?.reciever,
            });
          }
  
          const messageData = await messageModel.create({
            text: data?.text,
            imageUrl: data?.imageUrl,
            videoUrl: data?.videoUrl,
            msgByUserId: data?.msgByUserId,
          });
  
          await conversationModel.updateOne(
            { _id: conversation?._id },
            { $push: { messages: messageData?._id } }
          );
  
          const getConversation = await conversationModel
            .findOne({
              $or: [
                { sender: data?.sender, receiver: data?.reciever },
                { sender: data?.reciever, receiver: data?.sender },
              ],
            })
            .populate("messages")
            .sort({ createdAt: -1 });
  
          io.to(data?.sender).emit("message", getConversation?.messages);
          io.to(data?.reciever).emit("message", getConversation?.messages);
        } catch (error) {
          console.error("Error in new message event:", error.message);
          socket.emit("error", "Failed to send message.");
        }
      });
  

  
      socket.on("disconnect", () => {
        onlineUser.delete(userdata?._id);
        console.log("Disconnected user", socket.id);
      });
    } catch (error) {
      console.error("Error in connection event:", error.message);
      socket.emit("error", "Connection failed.");
    }
  });
  

export { app, server };
