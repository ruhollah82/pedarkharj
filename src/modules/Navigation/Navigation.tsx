import * as React from "react";
import { Menu } from "antd";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

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
          justifyContent: "space-between",
          padding: "8px 0",
        }}
      >
        <Menu.Item key="account" style={{ flex: 1, textAlign: "center" }}>
          <Link to="/app/account">
            <Icon
              icon="mdi:account-circle"
              width={24}
              height={24}
              style={{
                color: currentPath === "account" ? "#1890ff" : "#595959",
              }}
            />
          </Link>
        </Menu.Item>

        <Menu.Item key="contacts" style={{ flex: 1, textAlign: "center" }}>
          <Link to="/app/contacts">
            <Icon
              icon="mdi:contacts"
              width={24}
              height={24}
              style={{
                color: currentPath === "contacts" ? "#1890ff" : "#595959",
              }}
            />
          </Link>
        </Menu.Item>

        <Menu.Item key="calculator" style={{ flex: 1, textAlign: "center" }}>
          <Link to="/app/calculator">
            <Icon
              icon="mdi:calculator"
              width={24}
              height={24}
              style={{
                color: currentPath === "calculator" ? "#1890ff" : "#595959",
              }}
            />
          </Link>
        </Menu.Item>

        <Menu.Item key="search" style={{ flex: 1, textAlign: "center" }}>
          <Link to="/app/search">
            <Icon
              icon="mdi:format-list-bulleted"
              width={24}
              height={24}
              style={{
                color: currentPath === "search" ? "#1890ff" : "#595959",
              }}
            />
          </Link>
        </Menu.Item>

        <Menu.Item key="home" style={{ flex: 1, textAlign: "center" }}>
          <Link to="/app/home">
            <Icon
              icon="mdi:home"
              width={24}
              height={24}
              style={{ color: currentPath === "home" ? "#1890ff" : "#595959" }}
            />
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default BottomNav;
