// src/hooks/useSnackbar.ts
import { useDispatch } from "react-redux";
import { showSnackbar } from "../app/store/slices/snackbarSlice";

const useSnackbar = () => {
  const dispatch = useDispatch();

  const showSuccess = (message: string) => {
    dispatch(showSnackbar({ message, severity: "success" }));
  };

  const showError = (message: string) => {
    dispatch(showSnackbar({ message, severity: "error" }));
  };

  const showWarning = (message: string) => {
    dispatch(showSnackbar({ message, severity: "warning" }));
  };

  const showInfo = (message: string) => {
    dispatch(showSnackbar({ message, severity: "info" }));
  };

  return { showSuccess, showError, showWarning, showInfo };
};

export default useSnackbar;
