interface SnackbarState {
  open: boolean;
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

export default SnackbarState;
