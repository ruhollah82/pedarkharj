import React from "react";
import Navigation from "../Navigation/Navigation";
import Container from "../container/Container";


interface Ilayout {
  children?: React.ReactNode;
}

function Layout({ children }: Ilayout) {
  return (
    <Container style={{ height: "100vh", flexDirection: "column" }}>
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
