import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import Authentication from "./modules/authentication/AuthenticationPage";
import MainApp from "./routes/mainApp";
import CustomSnackbar from "./components/common/CustomSnackbar";

function App() {
  // const { isAuthenticated } = useAuth();
  var isAuthenticated = false;
  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated ? (
        <MainApp />
      ) : (
        <Routes>
          <Route path="/Authentication" element={<Authentication />}></Route>
          <Route path="*" element={<Navigate to="/Authentication" />} />
        </Routes>
      )}
      <CustomSnackbar />
    </ThemeProvider>
  );
}

export default App;
