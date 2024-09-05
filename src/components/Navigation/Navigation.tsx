import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import ViewListIcon from "@mui/icons-material/ViewList";

function BottomNav() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ backgroundColor: "RGBA(225,225,225,0.5)" }}>
      <BottomNavigation
        sx={{
          width: "100%",
          minWidth: "300px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(255,255,255,0.5)",
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="●"
          value="account"
          icon={<AccountCircleIcon />}
          sx={{ minWidth: 0 }}
        />
        <BottomNavigationAction
          label="●"
          value="contacts"
          icon={<ContactsIcon />}
          sx={{ minWidth: 0 }}
        />
        <BottomNavigationAction
          label="●"
          value="calculator"
          icon={<CalculateIcon />}
          sx={{ minWidth: 0 }}
        />
        <BottomNavigationAction
          label="●"
          value="list"
          icon={<ViewListIcon />}
          sx={{ minWidth: 0 }}
        />
        <BottomNavigationAction
          label="●"
          value="home"
          icon={<HomeIcon />}
          sx={{ minWidth: 0 }}
        />
      </BottomNavigation>
    </div>
  );
}
export default BottomNav;
