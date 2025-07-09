// src/features/auth/AuthenticationPage.tsx
import { Box, Typography, Slide } from "@mui/material";
import styles from "./SignUp.module.css";
import Container from "../../layouts/Container/Container";
import ProgresBar from "../../components/progresBar/progresBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { StepComponents } from "./StepManager";
import { AppDispatch } from "../../app/store/store";

const AuthenticationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slideDirection, waiting } = useSelector(
    (state: RootState) => state.authFlow
  );

  return (
    <Container className={styles.container}>
      <ProgresBar active={waiting} />
      <Typography variant="h5" align="center" className={styles.title}>
        احراز هویت
      </Typography>
      <Box className={styles.form}>
        <Slide in direction={slideDirection} mountOnEnter unmountOnExit>
          <div>
            <StepComponents />
          </div>
        </Slide>
      </Box>
    </Container>
  );
};

export default AuthenticationPage;
