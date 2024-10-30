import React from "react";
import "./App.css";
import theme from "./components/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Contacts from "./components/pages/contacts/Contacts";
import Account from "./components/pages/account/Account";
import Calculator from "./components/pages/claculator/Calculator";
import Search from "./components/pages/serach/Search";
import { useAuth } from "./components/contexts/AuthContext";
import Authentication from "./components/Authentication/Authentication";
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
      {isAuthenticated ? (
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
