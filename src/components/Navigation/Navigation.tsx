import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Link } from "react-router-dom";

function BottomNav() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        bottom: "0",
        right: "0",
        left: "0",
        justifyContent: "center",
      }}
    >
      <BottomNavigation
        sx={{
          minWidth: "300px",
          maxWidth: "550px",
          width: "100%",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(5px)",
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label=""
          value="account"
          icon={<AccountCircleIcon />}
          sx={{ minWidth: 0 }}
          component={Link}
          to="/app/account"
        />
        <BottomNavigationAction
          label=""
          value="contacts"
          icon={<ContactsIcon />}
          sx={{ minWidth: 0 }}
          component={Link}
          to="/app/contacts"
        />
        <BottomNavigationAction
          label=""
          value="calculator"
          icon={<CalculateIcon />}
          sx={{ minWidth: 0 }}
          component={Link}
          to="/app/calculator"
        />
        <BottomNavigationAction
          label=""
          value="search"
          icon={<ViewListIcon />}
          sx={{ minWidth: 0 }}
          component={Link}
          to="/app/search"
        />
        <BottomNavigationAction
          label=""
          value="home"
          icon={<HomeIcon />}
          sx={{ minWidth: 0 }}
          component={Link}
          to="/app/home"
        />
      </BottomNavigation>
    </div>
  );
}
export default BottomNav;
