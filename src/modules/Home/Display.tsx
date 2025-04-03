import styles from "./Display.module.css";
import { Icon } from "@iconify/react";

function Display() {
  return (
    <div className={styles.display}>
      <div className={styles.card}>
        <div className={styles.debt}>
          <Icon
            icon="solar:alt-arrow-up-linear"
            width={24}
            height={24}
            style={{
              color: "white",
            }}
          />
        </div>
        <div>
          <div>بدهکار</div>
          <span>-10000</span>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.income}>
          <Icon
            icon="solar:alt-arrow-down-linear"
            width={24}
            height={24}
            style={{
              color: "white",
            }}
          />
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
