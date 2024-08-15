import UserValidation from "../validation/user.validation.js";
import userService from "../service/user.service.js";
import Customvalidation from "../helper/validation.js";
import _ from "lodash";
const UserController = {};
UserController.UserSignup = async (request, response) => {
  try {
    const validation = await UserValidation.userRegister(request.body);
    if (validation.fails()) {
      return Customvalidation(validation, response);
    }
    const data = await userService.Register(request);
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

UserController.verifyEmail = async (request, response) => {
  try {
    const validation = await UserValidation.userEmailVerify(request.body);
    if (validation.fails()) {
      return Customvalidation(validation, response);
    }
    const data = await userService.verifyEmail(request);
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
UserController.checkingpassword = async (request, response) => {
  try {
    const validation = await UserValidation.userVerifyPassword(request.body);
    if (validation.fails()) {
      return Customvalidation(validation, response);
    }
    const data = await userService.verifyPassword(request);
    console.log(data.status);
    if (!data.status) {
      return response.status(200).json(data);
    } else {
      const cookiesOption = {
        http: true,
        secure: true,
      };
      return response
        .cookie("token", data?.data?.tokken, cookiesOption)
        .status(200)
        .json(data);
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

UserController.UserProfile = async (request, response) => {
  try {
    const data = await userService.getUserData(request);
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
UserController.searchingUser = async (request, response) => {
  try {
    const data = await userService.getUserData(request);
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

UserController.userUpdateProfile = async (request, response) => {
  try {
    const validation = await UserValidation.updateUser(request.body);
    if (validation.fails()) {
      return Customvalidation(validation, response);
    }
    const data = await userService.updateUserProfile(request);
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
UserController.userLogout = async (request, response) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return response.cookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
export default UserController;
