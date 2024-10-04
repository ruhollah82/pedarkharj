// src/hooks/useSignup.ts
import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:1111/api/v1/users/verify-number",
        {
          number: phoneNumber,
          token: "",
          code: 0,
        }
      );
      if (response.data.token) {
        setApiToken(response.data.token);
        showSnackbar("کد تایید فرستاده شد", "info");
        return true;
      }
      showSnackbar("خطا در ارسال کد تایید", "warning");
      return false;
    } catch (error: any) {
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
      const response = await axios.post(
        "http://localhost:1111/api/v1/users/verify-number",
        {
          number: phoneNumber,
          token: apiToken,
          code: +verificationCode,
        }
      );
      if (response.data.access) {
        setAccess(response.data.access);
        return true;
      }
      showSnackbar("کد تایید نامعتبر", "warning");
      return false;
    } catch (error: any) {
      showSnackbar(
        error.response?.data?.message || "خظای دسترسی به سرور",
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
  };
};

export default useSignup;
