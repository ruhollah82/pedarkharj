// src/features/auth/StepManager.tsx
import React, { useEffect } from "react";

import PhoneNumberStep from "./steps/EnterPhoneNumberStep";
import VerificationCodeStep from "./steps/VerificationCodeStep";
import UserCredentialsStep from "./steps/UserCredentialsStep";
import EnterPasswordStep from "./steps/EnterPasswordStep";
import ForgetPasswordStep from "./steps/ForgetPasswordStep";
import useAuthFlow from "../../hooks/useAuthFlow";
import ResetPasswordStep from "./steps/ResetPasswordStep";

export const StepComponents: React.FC = () => {
  const { activeStep } = useAuthFlow();
  console.log(activeStep);
  const stepComponents = {
    0: <PhoneNumberStep />,
    1: <VerificationCodeStep />,
    2: <UserCredentialsStep />,
    100: <EnterPasswordStep />,
    101: <ForgetPasswordStep />,
    102: <ResetPasswordStep />,
  };

  return stepComponents[activeStep as keyof typeof stepComponents] || null;
};
