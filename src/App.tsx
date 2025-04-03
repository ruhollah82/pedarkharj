import React from "react";
import "./App.css";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./layouts/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./modules/Home/Home";
import Contacts from "./modules/Contacts/Contacts";
import Account from "./modules/Account/Account";
import Calculator from "./modules/Claculator/Calculator";
import Search from "./modules/Search/Search";
import { useAuth } from "./context/AuthContext";
import Authentication from "./modules/Authentication/Authentication";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
function App() {
  const { isAuthenticated } = useAuth(); // Access the authentication status from context
  // var isAuthenticated = true;
  return (
    // <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      {true ? (
        <Layout>
          <Routes>
            <Route path="/app/home" element={<Home />} />
            <Route path="/app/contacts" element={<Contacts />} />
            <Route path="/app/account" element={<Account />} />
            <Route path="/app/calculator" element={<Calculator />} />
            <Route path="/app/search" element={<Search />} />
            {/* Add a catch-all route for unknown URLs */}
            <Route path="*" element={<Navigate to="/app/home" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/Authentication" element={<Authentication />}></Route>
          <Route path="*" element={<Navigate to="/Authentication" />} />
        </Routes>
      )}
    </ThemeProvider>
    // </CacheProvider>
  );
}

export default App;
