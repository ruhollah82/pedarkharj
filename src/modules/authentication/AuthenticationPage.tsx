// src/features/auth/AuthenticationPage.tsx
import { useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";
import { StepComponents } from "./StepManager";
import { Layout, Typography, theme } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import ProgresBar from "../../components/progresBar/progresBar";
import styles from "./SignUp.module.css";
import { useAuthErrorsNotifier } from "../../hooks/useAuthErrorsNotifier";

const { Content } = Layout;
const { Title } = Typography;

const AuthenticationPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useAuthErrorsNotifier();

  const { slideDirection, waiting } = useAppSelector(
    (state: RootState) => state.authFlow
  );

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "left" ? -300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: colorBgContainer,
        overflow: "hidden",
      }}
    >
      <Content className={styles.container}>
        <ProgresBar active={waiting} />
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          احراز هویت
        </Title>

        <div
          className={styles.form}
          style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={useAppSelector(
                (state: RootState) => state.authFlow.activeStep
              )}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              style={{ width: "100%" }}
            >
              <StepComponents />
            </motion.div>
          </AnimatePresence>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthenticationPage;
