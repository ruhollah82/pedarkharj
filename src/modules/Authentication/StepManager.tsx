import React from "react";
import PhoneNumberStep from "./steps/EnterPhoneNumberStep";
import VerificationCodeStep from "./steps/VerificationCodeStep";
import UserCredentialsStep from "./steps/UserCredentialsStep";
import EnterPasswordStep from "./steps/EnterPasswordStep";
import ForgetPasswordStep from "./steps/ForgetPasswordStep";

interface StepComponentsProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleFinish: () => void;
  handleLogin: () => void;
  resendVerificationCode: () => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  resendCodeTimer: number;
  errors: {
    phoneError?: string;
    codeError?: string;
    usernameError?: string;
    passwordError?: string;
  };
}

export const StepComponents: React.FC<StepComponentsProps> = ({
  activeStep,
  handleNext,
  handleBack,
  handleFinish,
  handleLogin,
  resendVerificationCode,
  verificationCode,
  setVerificationCode,
  password,
  setPassword,
  username,
  setUsername,
  phoneNumber,
  setPhoneNumber,
  countryCode,
  setCountryCode,
  resendCodeTimer,
  errors,
}) => {
  const stepComponents = {
    0: (
      <PhoneNumberStep
        Code={countryCode}
        setCountrycode={setCountryCode}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleNext={handleNext}
        error={errors.phoneError}
      />
    ),
    1: (
      <VerificationCodeStep
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        handleNext={handleNext}
        handleBack={handleBack}
        error={errors.codeError}
      />
    ),
    2: (
      <UserCredentialsStep
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleFinish={handleFinish}
        usernameError={errors.usernameError}
        passwordError={errors.passwordError}
      />
    ),
    100: (
      <EnterPasswordStep
        password={password}
        setPassword={setPassword}
        handleNext={handleNext}
        handleBack={handleBack}
        handleLogin={handleLogin}
        error={errors.codeError}
      />
    ),
    101: (
      <ForgetPasswordStep
        error={errors.codeError}
        handleBack={handleBack}
        handleNext={handleNext}
        setVerificationCode={setVerificationCode}
        verificationCode={verificationCode}
        seconds={resendCodeTimer}
        sendVerificationCode={resendVerificationCode}
      />
    ),
  };

  return stepComponents[activeStep as keyof typeof stepComponents] || null;
};
