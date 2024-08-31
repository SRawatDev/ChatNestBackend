import jwt from "jsonwebtoken";
const secretKey = "sumitrawat";
const getUserInfo = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, auth) => {
      if (err) {
        reject(err);
      } else {
        resolve( auth );
      }
    });
  });
};

export default getUserInfo;
