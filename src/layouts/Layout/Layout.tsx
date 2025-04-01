import React from "react";
import Navigation from "../../modules/Navigation/Navigation";
import Container from "../Container/Container";
import styles from "./Layout.module.css";

interface Ilayout {
  children?: React.ReactNode;
}

function Layout({ children }: Ilayout) {
  return (
    <Container className={styles.maincontainer}>
      <Container
        style={{
          flex: "1",
          overflowY: "auto",
          backgroundColor: "RGBA(225,225,225,0.5)",
        }}
      >
        {children}
      </Container>
      <Navigation />
    </Container>
  );
}

export default Layout;
