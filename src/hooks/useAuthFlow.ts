// src/features/auth/redux/useAuthFlow.ts
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { RootState } from "../app/store/store";
import {
  setStep,
  setDirection,
  setWaiting,
  setPhoneNumber,
  setCountryCode,
  setUsername,
  setPassword,
  setVerificationCode,
  setResendCodeTimer,
  setPhoneError,
  setCodeError,
  setUsernameError,
  setPasswordError,
  resetAuthFlow,
} from "../app/store/slices/authFlowSlice";
const useAuthFlow = () => {
  const dispatch = useAppDispatch();

  // Select the entire authFlow state
  const authFlowState = useAppSelector((state: RootState) => state.authFlow);

  // Individual state selectors
  const activeStep = useAppSelector(
    (state: RootState) => state.authFlow.activeStep
  );
  const slideDirection = useAppSelector(
    (state: RootState) => state.authFlow.slideDirection
  );
  const waiting = useAppSelector((state: RootState) => state.authFlow.waiting);
  const phoneNumber = useAppSelector(
    (state: RootState) => state.authFlow.phoneNumber
  );
  const countryCode = useAppSelector(
    (state: RootState) => state.authFlow.countryCode
  );
  const username = useAppSelector(
    (state: RootState) => state.authFlow.username
  );
  const password = useAppSelector(
    (state: RootState) => state.authFlow.password
  );
  const verificationCode = useAppSelector(
    (state: RootState) => state.authFlow.verificationCode
  );
  const resendCodeTimer = useAppSelector(
    (state: RootState) => state.authFlow.resendCodeTimer
  );
  const errors = useAppSelector((state: RootState) => state.authFlow.errors);

  const error = useAppSelector((state: RootState) => state.auth.error);

  // Action dispatchers
  const nextStep = (step?: number) => {
    const next = step !== undefined ? step : activeStep + 1;
    dispatch(setStep(next));
    dispatch(setDirection("left"));
  };

  const prevStep = () => {
    dispatch(setStep(Math.max(activeStep - 1, 0)));
    dispatch(setDirection("right"));
  };

  return {
    // State
    state: authFlowState,
    activeStep,
    slideDirection,
    waiting,
    phoneNumber,
    countryCode,
    username,
    password,
    verificationCode,
    resendCodeTimer,
    errors,
    error,

    // Actions
    setStep: (step: number) => dispatch(setStep(step)),
    setDirection: (direction: "left" | "right") =>
      dispatch(setDirection(direction)),
    setWaiting: (isWaiting: boolean) => dispatch(setWaiting(isWaiting)),
    setPhoneNumber: (number: string) => dispatch(setPhoneNumber(number)),
    setCountryCode: (code: string) => dispatch(setCountryCode(code)),
    setUsername: (name: string) => dispatch(setUsername(name)),
    setPassword: (pass: string) => dispatch(setPassword(pass)),
    setVerificationCode: (code: string) => dispatch(setVerificationCode(code)),
    setResendCodeTimer: (seconds: number) =>
      dispatch(setResendCodeTimer(seconds)),
    setPhoneError: (error: string) => dispatch(setPhoneError(error)),
    setCodeError: (error: string) => dispatch(setCodeError(error)),
    setUsernameError: (error: string) => dispatch(setUsernameError(error)),
    setPasswordError: (error: string) => dispatch(setPasswordError(error)),
    resetAuthFlow: () => dispatch(resetAuthFlow()),

    // Convenience methods
    nextStep,
    prevStep,
    startLoading: () => dispatch(setWaiting(true)),
    stopLoading: () => dispatch(setWaiting(false)),
    clearErrors: () => {
      dispatch(setPhoneError(""));
      dispatch(setCodeError(""));
      dispatch(setUsernameError(""));
      dispatch(setPasswordError(""));
    },
    clearPhoneError: () => dispatch(setPhoneError("")),
    clearCodeError: () => dispatch(setCodeError("")),
    clearUsernameError: () => dispatch(setUsernameError("")),
    clearPasswordError: () => dispatch(setPasswordError("")),

    // Timer management
    startResendTimer: (seconds: number) => {
      dispatch(setResendCodeTimer(seconds));
    },
    decrementResendTimer: () => {
      if (resendCodeTimer > 0) {
        dispatch(setResendCodeTimer(resendCodeTimer - 1));
      }
    },
  };
};

export default useAuthFlow;
