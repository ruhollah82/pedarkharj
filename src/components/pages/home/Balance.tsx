import React from "react";
import styles from "./Balance.module.css";

interface WalletBalanceProps {
  balance: number;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  return (
    <div className={styles.walletCard}>
      <h1 className={styles.balanceText}>+{balance.toLocaleString("en-US")}</h1>
      <h6 className={styles.currency}>تومان</h6>
    </div>
  );
};

export default WalletBalance;
