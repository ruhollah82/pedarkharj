import React, { useState } from "react";
import { Button, Input, Form, Typography, Row, Col, Alert, Flex } from "antd";
import Lottie from "lottie-react";
import passwordResetAnim from "../../../assets/Images/verification.json"; // You'll need to add this animation
import styles from "../SignUp.module.css";
import useAuthFlow from "../../../hooks/useAuthFlow";
import useAuth from "../../../hooks/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import useApp from "antd/es/app/useApp";

const { Text, Title } = Typography;

const ResetPasswordStep = () => {
  const { message } = useApp();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { phoneNumber, prevStep, tempToken, setPassword, password } =
    useAuthFlow();
  const { resetUserPassword, loginUser } = useAuth();

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate passwords match
      if (values.newPassword !== values.confirmPassword) {
        form.setFields([
          {
            name: "confirmPassword",
            errors: ["رمزهای عبور وارد شده یکسان نیستند"],
          },
        ]);
        return;
      }

      // Call reset password API
      const resetResponse = await resetUserPassword({
        number: phoneNumber,
        token: tempToken,
        password: values.newPassword,
      }).unwrap();

      console.log("✅ reset pass response:", resetResponse);

      // Check for success (based on your structure)
      if (resetResponse?.success === true) {
        message.success("رمز عبور با موفقیت تغییر کرد.");
        await setPassword(values.newPassword);
        console.log("مستقیم از فرم:", values.newPassword);
        console.log("ریداکس:", password);

        // Auto-login with new password
        const loginResponse = await loginUser({
          number: phoneNumber,
          password: values.newPassword,
        }).unwrap();

        console.log("✅ login after reset:", loginResponse);

        if (loginResponse?.fullResponse?.data?.status === 200) {
          message.success("ورود موفق!");
        } else {
          setError("ورود موفق نبود. لطفاً دوباره وارد شوید.");
        }
      } else {
        setError(resetResponse?.success || "خطا در تغییر رمز عبور.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "خطا در تغییر رمز عبور. لطفاً دوباره تلاش کنید.";
      setError(errorMessage);

      form.setFields([
        {
          name: "newPassword",
          errors: [errorMessage],
        },
        {
          name: "confirmPassword",
          errors: [errorMessage],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", padding: 0 }}
      className={styles.center}
    >
      <Col xs={24} md={16} lg={12} xl={10} style={{ textAlign: "center" }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          رمز عبور جدید را تنظیم کنید
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          رمز عبور جدیدی برای حساب خود انتخاب کنید
        </Text>

        <Lottie
          animationData={passwordResetAnim}
          loop={false}
          style={{ maxWidth: 300, margin: "0 auto 24px" }}
        />

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="newPassword"
            label="رمز عبور جدید"
            rules={[
              { required: true, message: "لطفاً رمز عبور جدید را وارد کنید" },
              { min: 8, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                message: "رمز عبور باید شامل حروف و اعداد باشد",
              },
            ]}
          >
            <Input.Password
              placeholder="رمز عبور جدید"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="تکرار رمز عبور"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "لطفاً رمز عبور را تأیید کنید" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("رمزهای عبور وارد شده یکسان نیستند")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="تکرار رمز عبور"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>

          <div style={{ margin: "24px 0" }}>
            <Button
              type="link"
              onClick={() => setPasswordVisible(!passwordVisible)}
              icon={
                passwordVisible ? (
                  <Icon icon="ant-design:eye-invisible-filled" />
                ) : (
                  <Icon icon="ant-design:eye-filled" />
                )
              }
            >
              {passwordVisible ? "پنهان کردن رمزها" : "نمایش رمزها"}
            </Button>
          </div>

          <Form.Item>
            <Row gutter={16} justify="center">
              <Col>
                <Button
                  type="default"
                  onClick={prevStep}
                  size="large"
                  style={{ minWidth: 100, height: 40 }}
                >
                  قبلی
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  size="large"
                  style={{ minWidth: 100, height: 40 }}
                >
                  {isLoading ? "در حال ذخیره..." : "تغییر رمز عبور"}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Flex>
  );
};

export default ResetPasswordStep;
