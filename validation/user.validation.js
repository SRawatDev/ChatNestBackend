import  customvalidation  from "../helper/customvalidation.js";
const UserValidation = {};
UserValidation.userRegister = async (body) => {
  let rules = {
    name: "required|string",
    email: "required|email",
    password: "required|string",
    profile_pic: "required|string",
  };
  const validation = await customvalidation(body, rules)
  return validation;
};

UserValidation.userEmailVerify = async (body) => {
  let rules = {
    email: "required|email",
  };
  const validation = await customvalidation(body, rules)
  return validation;
};

UserValidation.userVerifyPassword = async (body) => {
  let rules = {
    userId: 'required',
    password: "required|string",
  };
  const validation = await customvalidation(body, rules)
  return validation;
};

UserValidation.updateUser = async (body) => {
  let rules = {
    name: "required|string",
    email: "required|email",
    profile_pic: "required|string",
  }
  const validation = await customvalidation(body, rules)
  return validation;
}

export default UserValidation;
