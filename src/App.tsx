import React from "react";
import "./App.css";
import theme from "./components/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Contacts from "./components/pages/contacts/Contacts";
import Account from "./components/pages/account/Account";
import Calculator from "./components/pages/claculator/Calculator";
import Search from "./components/pages/serach/Search";
import LoginPage from "./components/pages/login/Login";

function App() {
  var isLogedin = true;
  return (
    <ThemeProvider theme={theme}>
      {isLogedin ? (
        <Layout>
          <Routes>
            <Route path="/app/home" element={<Home />} />
            <Route path="/app/contacts" element={<Contacts />} />
            <Route path="/app/account" element={<Account />} />
            <Route path="/app/calculator" element={<Calculator />} />
            <Route path="/app/search" element={<Search />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
