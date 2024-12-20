const customIP = "";
const port = "1111";
const baseURL = "/api/v1";

const devivesAddress = customIP
  ? `http://${customIP}:${port}${baseURL}/devices`
  : `http://localhost:${port}${baseURL}/devices`;

const userAddres = customIP
  ? `http://${customIP}:${port}${baseURL}/users`
  : `http://localhost:${port}${baseURL}/users`;

interface Iapi {
  postLogOut: string;
  postLogOutAll: string;
  postCheckNumber: string;
  getUserInfo: string;
  postLogIn: string;
  postRefresh: string;
  postSignUp: string;
  postSendOTP: string;
  postVerifyOTP: string;
}

const API: Iapi = {
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
