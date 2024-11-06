// src/hooks/useSignup.ts
import { useState } from "react";
import axios from "axios";
import API from "../components/apiList/apiList";
import useCookie from "./useCookie";
const useAuth = () => {
  const [apiToken, setApiToken] = useState("");
  const [access, setAccess] = useState("");
  const [resendCodeTimer, setResendCodeTimer] = useState(0);
  const [errors, setErrors] = useState({
    phoneError: "",
    codeError: "",
    passwordError: "",
    usernameError: "",
  });

  const { deleteToken, getToken, saveToken } = useCookie();

  const sendVerificationCode = async (
    phoneNumber: string,
    showSnackbar: Function
  ): Promise<boolean> => {
    try {
      const response = await axios.post(API.postSendOTP, {
        number: phoneNumber,
      });
      console.log(response);
      if (response.data.status === 200) {
        setApiToken(response.data.token);
        showSnackbar("کد اعتبار سنجی فرستاده شد", "success");
        const delayTimeSeconds = +response.data.delayTimeSeconds;
        console.log(delayTimeSeconds);
        setResendCodeTimer(delayTimeSeconds);
        return true;
      } else if (
        response.data.status === 400 &&
        response.data.code === "number_delay"
      ) {
        showSnackbar("کد اعتبار سنجی قبلا فرستاده شده", "warning");
        const delayTimeSeconds = +response.data.delayTimeSeconds;
        console.log(delayTimeSeconds);
        setResendCodeTimer(delayTimeSeconds);
        return true;
      } else {
        console.log(response);
        showSnackbar("خطا در ارسال کد تایید", "error");
        return false;
      }
    } catch (error: any) {
      console.log(error.response);
      showSnackbar(
        error.response?.data?.message || "خطای دسترسی به سرور",
        "error"
      );
      return false;
    }
  };

  const checkNumberExist = async (
    phoneNunmer: string,
    showSnackbar: Function
  ): Promise<string> => {
    try {
      const response = await axios.post(API.postCheckNumber, {
        number: phoneNunmer,
      });
      console.log(response);
      if (response.data.isExist === true) {
        return "true";
      } else {
        return "false";
      }
    } catch (error) {
      error
        ? showSnackbar("خطای دسترسی به سرور", "error")
        : console.log(`check number error : ${error}`);
    }
    return "error";
  };

  const login = async (
    phoneNumber: string,
    password: string,
    showSnackbar: Function
  ) => {
    try {
      const response = await axios.post(API.postLogIn, {
        number: phoneNumber,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        if (response.data.status === 200) {
          console.log("token must be saved");

          saveToken(
            "access",
            response.data.access,
            +response.data.accessExpireSeconds
          );
          saveToken("refresh", response.data.refresh, 604800);
          saveToken(
            "test",
            "this is test token that saved in login function call",
            1000000
          );
        }
      }
    } catch (error) {}
  };

  const verifyNumber = async (
    phoneNumber: string,
    verificationCode: string,
    mode: string,
    showSnackbar: Function
  ): Promise<boolean> => {
    try {
      const response = await axios.post(API.postVerifyOTP, {
        number: phoneNumber,
        token: apiToken,
        otp: +verificationCode,
        mode: mode,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("status 200");
        if (
          response.data.status === 303 &&
          response.data.code === "go_signup"
        ) {
          showSnackbar("اعتبارسنجی با موفقیت انجام شد", "success");
          return true;
        } else if (
          response.data.status === 400 &&
          response.data.code === "wrong_otp"
        ) {
          console.log("wrong otp");
          showSnackbar("کد اعتبار سنجی اشتباه", "error");
          return false;
        } else if (
          response.data.status === 400 &&
          response.data.code === "invalid_field"
        ) {
          console.log("invalaid field");
          showSnackbar("کد اعتبار سنجی نامعتبر", "error");
          return false;
        } else if (response.data.status === 500) {
          showSnackbar("خطای داخلی سرور");
          return false;
        }
      }
      return false;
    } catch (error: any) {
      showSnackbar("خظای دسترسی به سرور", "error");
      return false;
    }
  };

  const finishSignUp = async (
    phoneNumber: string,
    userName: string,
    password: string,
    showSnackbar: Function
  ): Promise<boolean> => {
    try {
      const response = await axios.post(API.postSignUp, {
        number: phoneNumber,
        name: userName,
        password: password,
        token: apiToken,
      });
      console.log({
        name: userName,
        number: phoneNumber,
        password: password,
        token: apiToken,
      });
      console.log(response);
      return true;
    } catch (error: any) {
      console.log(error.response);
      showSnackbar(
        error.response?.data?.message || "خطای دسترسی به سرور",
        "error"
      );
      return false;
    }
  };
  return {
    apiToken,
    access,
    errors,
    sendVerificationCode,
    verifyNumber,
    setApiToken,
    setAccess,
    setErrors,
    finishSignUp,
    checkNumberExist,
    resendCodeTimer,
    login,
  };
};

export default useAuth;
