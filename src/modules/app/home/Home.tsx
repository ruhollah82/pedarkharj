import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import WalletBalance from "./Balance";
import Display from "./Display";
import Notification from "../../../components/Notification/Notification";
import axios from "axios";
import Container from "../../../layouts/Container/Container";
import { Icon } from "@iconify/react";
import { Space, Spin, Modal, Row, Col, Image, Button, Typography } from "antd";
import Expense_Type from "../../../types/types/expense.type";
import Cookies from "js-cookie";
import useUser from "../../../hooks/useUser";
import ErrorDisplay from "../ErrorDisplay";

const { Title, Text } = Typography;

function Home() {
  const [expenses, setExpenses] = useState<Expense_Type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const {
    avatars,
    loading: avatarsLoading,
    error: avatarsError,
    getAvatars,
    selectAvatar,
  } = useUser();

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
  // Fetch expenses when the component mounts
  useEffect(() => {
    fetchExpenses();

    // Check if it's first login and avatar needs to be selected
    const firstLogin = Cookies.get("first_login") === "true";
    const avatarSet = Cookies.get("user_avatar");

    if (firstLogin && !avatarSet) {
      setShowWelcome(true);
      setShowAvatarPopup(true);
      fetchAvatars();
    }
  }, []);

  const fetchAvatars = async () => {
    try {
      await getAvatars();
    } catch (error) {
      console.error("Failed to fetch avatars:", error);
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const confirmAvatarSelection = async () => {
    if (!selectedAvatar) return;

    try {
      await selectAvatar(selectedAvatar);
      Cookies.set("user_avatar", selectedAvatar, {
        expires: 365,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("first_login", "false", { expires: 365 });
      setShowAvatarPopup(false);
      setShowWelcome(false);
    } catch (error) {
      console.error("Avatar selection failed:", error);
    }
  };

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => {
          setError(null);
          setLoading(true);
          fetchExpenses();
        }}
      />
    );
  }

  return (
    <div className={styles.homecontainer}>
      {/* Welcome Screen Overlay */}
      {showWelcome && (
        <div className={styles.welcomeOverlay}>
          <div className={styles.welcomeCard}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 16 }}>
              به پدار خرج خوش آمدید!
            </Title>
            <Text
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              برای تکمیل ثبت نام، لطفاً یک تصویر پروفایل انتخاب کنید
            </Text>

            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                size="large"
                onClick={() => setShowAvatarPopup(true)}
              >
                انتخاب آواتار
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Selection Popup */}
      <Modal
        title="پروفایل خود را انتخاب کنید"
        open={showAvatarPopup}
        onCancel={() => {
          setShowAvatarPopup(false);
          setShowWelcome(false);
        }}
        footer={null}
        centered
        width={320}
        styles={{ body: { padding: "16px" } }}
      >
        <Text
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          برای تکمیل ثبت نام، یک آواتار انتخاب کنید
        </Text>

        {avatarsLoading ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <Spin size="large" />
            <div style={{ marginTop: 8 }}>در حال دریافت آواتارها...</div>
          </div>
        ) : avatarsError ? (
          <Text type="danger" style={{ textAlign: "center", display: "block" }}>
            خطا در دریافت آواتارها
          </Text>
        ) : // Safe array check and length check
        Array.isArray(avatars) && avatars.length > 0 ? (
          <>
            <Row gutter={[16, 16]} justify="center">
              {avatars.map((avatar) => (
                <Col key={avatar} span={8}>
                  <div
                    className={styles.avatarContainer}
                    style={{
                      border:
                        selectedAvatar === avatar
                          ? "3px solid #1890ff"
                          : "1px solid #d9d9d9",
                    }}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <Image
                      src={avatar}
                      preview={false}
                      width="100%"
                      className={styles.avatarImage}
                    />
                  </div>
                </Col>
              ))}
            </Row>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Button
                type="primary"
                size="large"
                onClick={confirmAvatarSelection}
                disabled={!selectedAvatar}
                loading={avatarsLoading}
              >
                تأیید انتخاب
              </Button>
            </div>
          </>
        ) : (
          <Text style={{ textAlign: "center" }}>هیچ آواتاری یافت نشد</Text>
        )}
      </Modal>

      {/* Main Dashboard Content */}
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
          <div className={styles.loadingContainer}>
            <Spin size="large" style={{ color: "#fff" }} />
            <span className={styles.loadingText}>Loading expenses...</span>
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
