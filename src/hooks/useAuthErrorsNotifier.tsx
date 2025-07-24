import { useEffect, useRef } from "react";
import { message } from "antd";
import { useAppSelector } from "../app/store/hooks"; // Adjust path

export const useAuthErrorsNotifier = () => {
  const errors = useAppSelector((state) => state.authFlow.errors);

  // To prevent repeat notifications
  const prevErrorsRef = useRef(errors);

  useEffect(() => {
    const errorKeys = Object.keys(errors) as Array<keyof typeof errors>;

    errorKeys.forEach((key) => {
      const newError = errors[key];
      const oldError = prevErrorsRef.current[key];

      if (newError && newError !== oldError) {
        message.error(newError);
      }
    });

    prevErrorsRef.current = errors;
  }, [errors]);
};
