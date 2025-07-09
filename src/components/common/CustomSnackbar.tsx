// src/components/common/CustomSnackbar.tsx
import React from "react";
import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../../app/store/slices/snackbarSlice";
import { RootState } from "../../app/store/store";

const TransitionUp = (props: SlideProps) => (
  <Slide {...props} direction="down" />
);

const CustomSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: RootState) => state.snackbar
  );

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      TransitionComponent={TransitionUp}
    >
      <Alert onClose={handleClose} severity={severity} variant="standard">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
