import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import Authentication from "./modules/Authentication/AuthenticationPage";
import MainApp from "./routes/mainApp";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth(); // Access the authentication status from context
  // var isAuthenticated = true;
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
    </ThemeProvider>
  );
}

export default App;
