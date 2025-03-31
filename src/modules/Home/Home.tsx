import React, { useEffect, useState } from "react";
import Container from "../../layouts/Container/Container";
import styles from "./Home.module.css";
import { QuestionMarkOutlined } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import WalletBalance from "./Balance";
import Display from "./Display";
import Notification from "../../components/Notification/Notification";
import axios from "axios";

interface Expense {
  index: number;
  date: string;
  picture: string;
  title: string;
  amount: number;
  description: string;
}

function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get<Expense[]>(
          "http://172.24.3.129:8888/expenses"
        ); // Adjust API endpoint
        setExpenses(response.data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Failed to fetch expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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

        {loading && "Loading..."}
        {expenses.map((expense) => (
          <Notification key={expense.index} expense={expense} />
        ))}
      </div>
    </div>
  );
}

export default Home;
