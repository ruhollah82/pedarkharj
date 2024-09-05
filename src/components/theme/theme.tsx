import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Vazir','Roboto', sans-serif",
    h1: {
      fontFamily: "'YourCustomFont', serif",
    },
  },
  components: {
    // MuiContainer: {
    //   styleOverrides: {
    //     maxWidthSm: {
    //       maxWidth: "480px",
    //       "@media (min-width: 0px)": {
    //         maxWidth: "480px",
    //       },
    //     },
    //     maxWidthMd: {
    //       maxWidth: "480px",
    //       "@media (min-width: 0px)": {
    //         maxWidth: "480px",
    //       },
    //     },
    //     root: {
    //       maxWidth: "480px",
    //       "@media (min-width: 0px)": {
    //         maxWidth: "480px",
    //       },
    //     },
    //   },
    //   defaultProps: {
    //     maxWidth: false,
    //   },
    // },
  },
});

export default theme;
