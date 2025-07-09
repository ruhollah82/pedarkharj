interface SnackbarState_type {
  open: boolean;
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

export default SnackbarState_type;
