// src/components/Signup/CustomSnackbar.tsx
import React from "react";
import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";

interface SnackbarState {
  open: boolean;
  severity: "success" | "error" | "warning" | "info";
  message: string;
}

interface CustomSnackbarProps {
  snackbarState: SnackbarState;
  setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

const TransitionUp = (props: SlideProps) => (
  <Slide {...props} direction="down" />
);

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  snackbarState,
  setSnackbarState,
}) => {
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={6000}
      onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      TransitionComponent={TransitionUp}
    >
      <Alert
        onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
        variant="standard"
      >
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;

