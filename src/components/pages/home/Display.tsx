import React from "react";
import styles from "./Display.module.css";
import { Card } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  ArrowUpwardOutlined,
} from "@mui/icons-material";

function Display() {
  return (
    <div className={styles.display}>
      <div className={styles.card}>
        <div className={styles.debt}>
          <ArrowUpward style={{ color: "white" }} />
        </div>
        <div>
          <div>بدهکار</div>
          <span>-10000</span>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.income}>
          <ArrowDownward style={{ color: "white" }} />
        </div>
        <div>
          <div>بستانکار</div>
          <span>-10000</span>
        </div>
      </div>
    </div>
  );
}

export default Display;
