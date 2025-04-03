import { Menu } from "antd";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { key: "account", icon: "solar:user-outline", path: "/app/account" },
  {
    key: "contacts",
    icon: "solar:users-group-rounded-linear",
    path: "/app/contacts",
  },
  {
    key: "calculator",
    icon: "solar:calculator-linear",
    path: "/app/calculator",
  },
  { key: "search", icon: "solar:rounded-magnifer-linear", path: "/app/search" },
  { key: "home", icon: "solar:home-angle-linear", path: "/app/home" },
];

function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "home";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        maxWidth: "550px",
        margin: "0 auto",
      }}
    >
      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]}
        style={{
          width: "100%",
          background: "transparent",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          padding: "8px",
        }}
      >
        {menuItems.map(({ key, icon, path }) => (
          <Menu.Item
            key={key}
            style={{
              width: "4rem",
              textAlign: "center",
            }}
          >
            <Link to={path}>
              <Icon
                icon={icon}
                width={24}
                height={24}
                style={{ color: currentPath === key ? "#1890ff" : "#595959" }}
              />
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default BottomNav;
