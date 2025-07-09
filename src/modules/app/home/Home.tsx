import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import WalletBalance from "./Balance";
import Display from "./Display";
import Notification from "../../../components/Notification/Notification";
import axios from "axios";
import Container from "../../../layouts/Container/Container";
import { Icon } from "@iconify/react";
import { Space, Spin } from "antd";
import Expense_Type from "../../../types/types/expense.type";

function Home() {
  const [expenses, setExpenses] = useState<Expense_Type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get<Expense_Type[]>(
          "https://my-json-server.typicode.com/ruhollah82/pedarkharj-dummy/expenses"
        );
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
          <Space className={styles.top}>
            <Icon
              icon="solar:question-circle-linear"
              width={24}
              height={24}
              color="#fff"
            />
            <Icon
              icon="solar:user-circle-linear"
              width={24}
              height={24}
              color="#fff"
            />
          </Space>
          <WalletBalance balance={200000} />
          <Display />
        </Container>
      </div>
      <Space className={styles.recentContainer}>
        <div className={styles.bilbilak}></div>

        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: "16px",
            }}
          >
            <Spin
              size="large"
              style={{ color: "#fff" }}
              tip="Loading expenses..."
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 500,
                marginTop: "8px",
              }}
            >
              Loading ...
            </span>
          </div>
        ) : (
          expenses.map((expense) => (
            <Notification key={expense.index} expense={expense} />
          ))
        )}
      </Space>
    </div>
  );
}

export default Home;
