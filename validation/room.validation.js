import  customvalidation  from "../helper/customvalidation.js";
const roomvalidation = {};
roomvalidation.createroom = async (body) => {
  let rules = {
    name: "required|string",
    users: "required|array",
    image:'required'
  };
  const validation = await customvalidation(body, rules)
  return validation;
};


export default roomvalidation;
