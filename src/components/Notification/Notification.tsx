import React, { useState } from "react";
import styles from "./Notification.module.css";
import { Avatar, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Expense {
  index: number;
  date: string;
  picture: string;
  title: string;
  amount: number;
  description: string;
}

interface NotificationProps {
  expense: Expense; // Define the prop type for an expense
}

const Notification: React.FC<NotificationProps> = ({ expense }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={handleExpandClick} className={styles.card}>
      <div className={styles.preview}>
        <div className={styles.avatar}>
          <Avatar
            sx={{ width: "3rem", height: "3rem" }}
            src={expense.picture}
          />
          <div className={styles.avatarInfo}>
            <h1 className={styles.avatarname}>{expense.title}</h1>
            {!expanded && <h2>{`${expense.title} یک دنگ...`}</h2>}
          </div>
        </div>
        <div className={styles.cardInfo}>
          <div>{expense.date}</div>
          {!expanded && (
            <div className={styles.amount} style={{ color: "green" }}>
              {`+${expense.amount}`}
            </div>
          )}
        </div>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={styles.expandedContent}>
          <p>{expense.description}</p>
          <Link to="/app/search" className={styles.link}>
            جزئیات
          </Link>
        </div>
      </Collapse>
      <button onClick={handleExpandClick} className={styles.expandButton}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </button>
    </div>
  );
};

export default Notification;
