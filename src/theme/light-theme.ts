// lightTheme.js
import { baseTokens } from "./tokens";
import { theme } from "antd";

export const lightTheme = {
  ...baseTokens,
  algorithm: theme.defaultAlgorithm,
  token: {
    ...baseTokens.token,

    // Color roles
    colorPrimary: baseTokens.token.primary6,
    colorSecondary: baseTokens.token.secondary6,
    colorWarning: baseTokens.token.warning6,
    colorError: baseTokens.token.danger6,
    colorInfo: baseTokens.token.primary6,
    colorSuccess: "#52c41a",

    // Backgrounds
    colorBgBase: baseTokens.token.bg6,
    colorBgContainer: baseTokens.token.bg1,
    colorBgElevated: baseTokens.token.bg2,
    colorBgLayout: baseTokens.token.bg6,
    colorBgSpotlight: baseTokens.token.neutral4,

    // Texts
    colorText: baseTokens.token.texts6,
    colorTextSecondary: baseTokens.token.texts5,
    colorTextTertiary: baseTokens.token.texts4,
    colorTextQuaternary: baseTokens.token.texts3,

    // Borders
    colorBorder: baseTokens.token.neutral6,
    colorBorderSecondary: baseTokens.token.neutral5,

    // Primary states
    colorPrimaryHover: baseTokens.token.primary5,
    colorPrimaryActive: baseTokens.token.primary7,
    colorPrimaryBg: baseTokens.token.primary1,

    // Secondary states
    colorSecondaryHover: baseTokens.token.secondary5,
    colorSecondaryActive: baseTokens.token.secondary7,
    colorSecondaryBg: baseTokens.token.secondary1,

    // Warning states
    colorWarningHover: baseTokens.token.warning5,
    colorWarningActive: baseTokens.token.warning7,
    colorWarningBg: baseTokens.token.warning1,

    // Danger states
    colorErrorHover: baseTokens.token.danger5,
    colorErrorActive: baseTokens.token.danger7,
    colorErrorBg: baseTokens.token.danger1,

    // Disabled states
    colorBgDisabled: baseTokens.token.neutral3,
    colorTextDisabled: baseTokens.token.texts3,

    // Controls
    controlItemBgHover: baseTokens.token.primary1,
    controlItemBgActive: baseTokens.token.primary2,

    // Components
    colorLink: baseTokens.token.primary6,
    colorLinkHover: baseTokens.token.primary5,
    colorLinkActive: baseTokens.token.primary7,
  },
};
