import React from "react";
import Container from "../../container/Container";
import styles from "./Home.module.css";
import { QuestionMark, QuestionMarkOutlined } from "@mui/icons-material";
import { Avatar, Box, Card, Typography } from "@mui/material";
import WalletBalance from "./Balance";
import Display from "./Display";
import Notification from "../../Notification/Notification";

function Home() {
  return (
    <div className={styles.homecontainer}>
      <div className={styles.fixed}>
        <Container className={styles.container}>
          <Box className={styles.top}>
            <QuestionMarkOutlined />
            <Avatar />
          </Box>
          <WalletBalance balance={200000} />
          <Display />
        </Container>
      </div>
      <div className={styles.recentContainer}>
        <div className={styles.bilbilak}></div>

        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
}

export default Home;
