import React from "react";
import Container from "../../container/Container";
import styles from "./Home.module.css";
import { QuestionMark, QuestionMarkOutlined } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import WalletBalance from "./Balance";
import Display from "./Display";

function Home() {
  return (
    <>
      <div className={styles.fixed}>
        <Container className={styles.container}>
          <Box className={styles.top}>
            <QuestionMarkOutlined />
            <Avatar />
          </Box>
          <WalletBalance balance={200000} />
          <Display />
        </Container>{" "}
      </div>
      <div className={styles.recentContainer}>
        <div>
          <h1>hey 1</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
          <h1>hey</h1>
        </div>
      </div>
    </>
  );
}

export default Home;
