import api from "../../types/interfaces/api";

const customIP = "";
const port = "1111";
const baseURL = "/api/v1";

const devivesAddress = customIP
  ? `http://${customIP}:${port}${baseURL}/devices`
  : `http://localhost:${port}${baseURL}/devices`;

const userAddres = customIP
  ? `http://${customIP}:${port}${baseURL}/users`
  : `http://localhost:${port}${baseURL}/users`;

const API: api = {
  postLogOut: `${devivesAddress}/logout`,
  postLogOutAll: `${devivesAddress}/logout-all`,
  postCheckNumber: `${userAddres}/check-number`,
  getUserInfo: `${userAddres}/info`,
  postLogIn: `${userAddres}/login`,
  postSignUp: `${userAddres}/signup`,
  postRefresh: `${userAddres}/refresh`,
  postSendOTP: `${userAddres}/send-otp`,
  postVerifyOTP: `${userAddres}/verify-otp`,
};

export default API;
