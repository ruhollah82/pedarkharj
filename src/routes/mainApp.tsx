import Layout from "../layouts/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../modules/app/home/Home";
import Contacts from "../modules/app/contacts/Contacts";
import Account from "../modules/app/account/Account";
import Calculator from "../modules/app/calculator/Calculator";
import Search from "../modules/app/search/Search";

const MainApp = () => {
  return (
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
  );
};

export default MainApp;
