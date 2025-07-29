import { Route, Routes, Navigate } from "react-router-dom";
import Authentication from "./modules/authentication/AuthenticationPage";
import MainApp from "./routes/mainApp";
import CustomSnackbar from "./components/common/CustomSnackbar";
import { App as AntdApp } from "antd";
import { ThemeProvider } from "./theme/ThemeProvider";
import { useAppSelector } from "./app/store/hooks";
import { RootState } from "./app/store/store";

function App() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <ThemeProvider>
      <AntdApp>
        {isAuthenticated ? (
          <MainApp />
        ) : (
          <Routes>
            <Route path="/Authentication" element={<Authentication />}></Route>
            <Route path="*" element={<Navigate to="/Authentication" />} />
          </Routes>
        )}
        <CustomSnackbar />
      </AntdApp>
    </ThemeProvider>
  );
}

export default App;
