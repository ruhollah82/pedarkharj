import React from "react";
import styles from "./Notification.module.css";
import { Avatar, Card } from "@mui/material";

function Notification() {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Avatar />
        <div className={styles.avatarInfo}>
          <h1>فلانی</h1>
          <h2>فلانی یک دنگ...</h2>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div>۱ فروردین</div>
        <div>{`+ ${100000}`}</div>
      </div>
    </div>
  );
}

export default Notification;
