import roomservice from "../service/room.service.js";
import roomvalidation from "../validation/room.validation.js";
import Customvalidation from "../helper/validation.js";
import _ from "lodash";
export const CreateRoom = async (request, response) => {
  try {
    const validation = await roomvalidation.createroom(request.body);
    if (validation.fails()) {
      return Customvalidation(validation, response);
    }
    const data = await roomservice.createroom(request);
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const userRoom=async(request,response)=>{
  
  try {
    const data=await  roomservice.getuserRoom(request)
    return response.status(200).json(data)
    
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
    
  }

}