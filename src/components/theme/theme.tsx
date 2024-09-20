import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Vazir', 'Roboto', sans-serif",
    h1: {
      fontFamily: "'YourCustomFont', serif",
    },
  },
  palette: {
    primary: {
      main: "rgb(2, 119, 189)", // Primary color
    },
    secondary: {
      main: "rgb(3, 155, 229)", // Secondary color
    },
  },
  shape: {
    borderRadius: 16, // Global border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Button-specific border radius
          textTransform: "none", // Prevent text capitalization in buttons
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          // padding: "24px 0",
          // backgroundColor: "rgba(255, 255, 255, 0.8)", // Stepper background customization
          // borderRadius: "16px", // Stepper-specific border radius
          // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow effect
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: "rgba(0, 0, 0, 0.54)",
          "&.Mui-active": {
            color: "rgb(2, 119, 189)", // Custom color for active steps
          },
          "&.Mui-completed": {
            color: "rgb(176, 190, 197)", // Custom color for completed steps
          },
        },
      },
    },
  },
});

export default theme;
