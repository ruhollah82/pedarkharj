// src/components/AvatarSelectionPopup.tsx
import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Image, Spin, Button, Typography } from "antd";
import useUser from "../../hooks/useUser";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

interface AvatarSelectionPopupProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (avatarUrl: string) => void;
}

const AvatarSelectionPopup = ({
  visible,
  onClose,
  onSelect,
}: AvatarSelectionPopupProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const { avatars, loading, error, getAvatars, selectAvatar } = useUser();

  useEffect(() => {
    if (visible && avatars.length === 0) {
      getAvatars();
    }
  }, [visible]);

  const handleAvatarSelect = async () => {
    if (!selectedAvatar) return;

    try {
      await selectAvatar(selectedAvatar);
      Cookies.set("user_avatar", selectedAvatar, {
        expires: 365,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      onSelect(selectedAvatar);
      onClose();
    } catch (error) {
      console.error("Avatar selection failed:", error);
    }
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ textAlign: "center", marginBottom: 0 }}>
          پروفایل خود را انتخاب کنید
        </Title>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={320}
      bodyStyle={{ padding: "16px" }}
    >
      <Text style={{ display: "block", textAlign: "center", marginBottom: 24 }}>
        برای تکمیل ثبت نام، یک آواتار انتخاب کنید
      </Text>

      {loading ? (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <Text type="danger" style={{ textAlign: "center", display: "block" }}>
          خطا در دریافت آواتارها
        </Text>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center">
            {avatars.map((avatar: string) => (
              <Col key={avatar} span={8}>
                <div
                  style={{
                    border:
                      selectedAvatar === avatar
                        ? "3px solid #1890ff"
                        : "1px solid #d9d9d9",
                    borderRadius: "50%",
                    padding: 4,
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <Image
                    src={avatar}
                    preview={false}
                    width="100%"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Button
              type="primary"
              size="large"
              onClick={handleAvatarSelect}
              disabled={!selectedAvatar}
            >
              تأیید انتخاب
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default AvatarSelectionPopup;
