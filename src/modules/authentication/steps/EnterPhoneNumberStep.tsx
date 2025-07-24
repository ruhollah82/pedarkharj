import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Typography,
  Form,
  Alert,
  Spin,
  Flex,
  FormProps,
} from "antd";
import Lottie from "lottie-react";
import phoneNumberAnim from "../../../assets/Images/phoneNumber.json";
import styles from "../SignUp.module.css";
import useAuthFlow from "../../../hooks/useAuthFlow";
import { baseTokens } from "../../../theme/tokens";
import { Icon } from "@iconify/react";
import useAuth from "../../../hooks/useAuth";
import { setWaiting } from "../../../app/store/slices/authFlowSlice";
import useApp from "antd/es/app/useApp";

const { Text, Title } = Typography;

const PhoneNumberStep = () => {
  const {
    phoneNumber,
    waiting,
    errors,
    setCountryCode,
    setPhoneNumber,
    setPhoneError,
    clearPhoneError,
    nextStep,
    setDirection,
    setStep,
  } = useAuthFlow();
  const { checkPhoneNumber } = useAuth();

  // Add this at the top or adjust as needed
  interface FieldType {
    phone: string;
  }
  const { message } = useApp();

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!values.phone) return;

    try {
      setWaiting(true);
      clearPhoneError();

      const rawPhone = values.phone;
      const formattedPhone = rawPhone.replace(/^0/, "+98");

      // Save phone to context
      setPhoneNumber(formattedPhone);

      // Verify phone with backend
      const res = await checkPhoneNumber({ number: phoneNumber });
      if (res.isExist.status === 200) {
        if (res.isExist.isExist === true) {
          setStep(100);
        } else if (res.isExist.isExist === false) {
          nextStep();
        }
      }

      // Handle API response
    } catch (error) {
      setPhoneError("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید");
      console.error("Phone verification error:", error);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", padding: 0 }}
      className={styles.center}
    >
      <div style={{ width: "100%", padding: 0, textAlign: "center" }}>
        <Spin spinning={waiting}>
          <Title
            level={3}
            style={{ marginBottom: 24, color: baseTokens.token.texts5 }}
          >
            شماری ای که میخای باهاش ثبت نام کنی رو وارد کن
          </Title>

          <Lottie
            animationData={phoneNumberAnim}
            loop={false}
            style={{ maxWidth: 300, margin: "0 auto 24px" }}
          />

          <Form layout="vertical" onFinish={handleSubmit} size="large">
            {errors.phoneError && (
              <Alert
                message={errors.phoneError}
                type="error"
                showIcon
                closable
                onClose={clearPhoneError}
                style={{ marginBottom: 24 }}
              />
            )}
            <Form.Item
              name="phone"
              label={
                <span style={{ color: baseTokens.token.texts5 }}>
                  شماره تلفن
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "لطفا شماره تلفن خود را وارد کنید!",
                },
                {
                  pattern: /^09\d{9}$/,
                  message: "لطفا یک شماره تلفن معتبر ایرانی وارد کنید!",
                },
              ]}
              style={{ color: baseTokens.token.texts4 }}
            >
              <Input
                prefix={
                  <Icon
                    icon="ic:baseline-phone"
                    style={{ color: baseTokens.token.texts4 }}
                  />
                }
                placeholder="مثال: 09123456789"
                value={phoneNumber}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={waiting}
                icon={<Icon icon="mdi:arrow-right" />}
                style={{ height: 40 }}
              >
                {waiting ? "در حال بررسی..." : "بعدی"}
              </Button>
            </Form.Item>
          </Form>

          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 24,
              color: baseTokens.token.texts4,
            }}
          >
            با وارد کردن شماره تلفن خود، شرایط استفاده و حریم خصوصی را می‌پذیرید
          </Text>
        </Spin>
      </div>
    </Flex>
  );
};

export default PhoneNumberStep;
