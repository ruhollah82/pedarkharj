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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/account" element={<Account />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
