// src/hooks/useSignup.ts
import { useState } from "react";
import axios from "axios";
import API from "../components/apiList/apiList";

const useSignup = () => {
  const [apiToken, setApiToken] = useState("");
  const [access, setAccess] = useState("");
  const [errors, setErrors] = useState({
    phoneError: "",
    codeError: "",
    passwordError: "",
    usernameError: "",
  });

  const sendVerificationCode = async (
    phoneNumber: string,
    showSnackbar: Function
  ): Promise<boolean> => {
    try {
      const response = await axios.post(API.postverifyNumber, {
        number: phoneNumber,
        token: "",
        code: 0,
      });
      console.log(response);
      if (response.data.token) {
        setApiToken(response.data.token);
        showSnackbar("کد تایید فرستاده شد", "success");
        return true;
      }
      console.log(response);

      showSnackbar("خطا در ارسال کد تایید", "warning");
      return false;
    } catch (error: any) {
      console.log(error.response);
      showSnackbar(
        error.response?.data?.message || "خطای دسترسی به سرور",
        "error"
      );
      return false;
    }
  };

  const verifyNumber = async (
    phoneNumber: string,
    verificationCode: string,
    showSnackbar: Function
  ): Promise<boolean> => {
    try {
      const response = await axios.post(API.postverifyNumber, {
        number: phoneNumber,
        token: apiToken,
        code: +verificationCode,
      });
      console.log(response);
      if (response.data.status === 303) {
        setAccess(response.data.access);
        return true;
      }
      console.log(response);
      showSnackbar(response.data.errors.number, "warning");
      return false;
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message || "خظای دسترسی به سرور",
        "error"
      );
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
      // if (response.data.token) {
      //   setApiToken(response.data.token);
      //   showSnackbar("کد تایید فرستاده شد", "info");
      return true;
      // }
      // console.log(response);

      // showSnackbar("خطا در ارسال کد تایید", "warning");
      // return false;
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
  };
};

export default useSignup;