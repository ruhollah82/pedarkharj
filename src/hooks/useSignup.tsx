// src/hooks/useSignup.ts
import { useState } from "react";
import axios from "axios";
import API from "../components/apiList/apiList";
import {
  useAuth,
  AuthContext,
  AuthProvider,
} from "../components/contexts/AuthContext";
import { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

const useSignup = () => {
  const [apiToken, setApiToken] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [refreshKey, setRefreshKey] = useState("");

  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  const [errors, setErrors] = useState({
    phoneError: "",
    codeError: "",
    passwordError: "",
    usernameError: "",
  });

  const { setIsAuthenticated } = useAuth();
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
        setAccessKey(response.data.access);
        setCookie("accessToken", response.data.access, {
          path: "/",
          maxAge: +response.data.accessExpireSeconds,
        });
        setCookie("refreshToken", response.data.refresh, {
          path: "/",
          maxAge: 604800,
        }); // 7 days for refresh token

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
      // console.log({
      //   name: userName,
      //   number: phoneNumber,
      //   password: password,
      //   token: apiToken,
      // });
      // console.log(response);
      if (response.data.status === 200) {
        // setApiToken(response.data.token);
        showSnackbar("ورود موفق", "info");
        setIsAuthenticated(true);
        return true;
      }
      // console.log(response);

      showSnackbar("متاسفیم... خطای غیر منتظره ای رخ داد", "warning");
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

  const checkNumber = async (
    phoneNumber: string,
    showSnackbar: Function
  ): Promise<[boolean, AxiosResponse<any, any>?]> => {
    try {
      const response = await axios.post(API.postCheckNumber, {
        number: phoneNumber,
      });
      return [true, response];
    } catch (error: any) {
      console.log(error.response);
      showSnackbar(
        error.response?.data?.message || "خطای دسترسی به سرور",
        "error"
      );
      return [false];
    }
  };

  return {
    apiToken,
    // accessKey,
    errors,
    sendVerificationCode,
    verifyNumber,
    setApiToken,
    setAccessKey,
    setErrors,
    finishSignUp,
    checkNumber,
  };
};

export default useSignup;
