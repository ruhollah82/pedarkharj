// darkTheme.js
import { baseTokens } from "./tokens";
import { theme } from "antd";

export const darkTheme = {
  ...baseTokens,
  algorithm: theme.darkAlgorithm,
  token: {
    ...baseTokens.token,

    // Color roles
    colorPrimary: baseTokens.token.primary5,
    colorSecondary: baseTokens.token.secondary5,
    colorWarning: baseTokens.token.warning5,
    colorError: baseTokens.token.danger5,
    colorInfo: baseTokens.token.primary5,
    colorSuccess: "#52c41a",

    // Backgrounds
    colorBgBase: baseTokens.token.texts10,
    colorBgContainer: baseTokens.token.texts8,
    colorBgElevated: baseTokens.token.texts8,
    colorBgLayout: baseTokens.token.texts9,
    colorBgSpotlight: baseTokens.token.texts8,

    // Texts
    colorText: baseTokens.token.texts1,
    colorTextSecondary: baseTokens.token.texts2,
    colorTextTertiary: baseTokens.token.texts3,
    colorTextQuaternary: baseTokens.token.texts4,

    // Borders
    colorBorder: baseTokens.token.texts8,
    colorBorderSecondary: baseTokens.token.texts7,

    // Primary states
    colorPrimaryHover: baseTokens.token.primary4,
    colorPrimaryActive: baseTokens.token.primary6,
    colorPrimaryBg: baseTokens.token.primary9,

    // Secondary states
    colorSecondaryHover: baseTokens.token.secondary4,
    colorSecondaryActive: baseTokens.token.secondary6,
    colorSecondaryBg: baseTokens.token.secondary9,

    // Warning states
    colorWarningHover: baseTokens.token.warning4,
    colorWarningActive: baseTokens.token.warning6,
    colorWarningBg: baseTokens.token.warning9,

    // Danger states
    colorErrorHover: baseTokens.token.danger4,
    colorErrorActive: baseTokens.token.danger6,
    colorErrorBg: baseTokens.token.danger9,

    // Disabled states
    colorBgDisabled: baseTokens.token.texts8,
    colorTextDisabled: baseTokens.token.texts5,

    // Controls
    controlItemBgHover: baseTokens.token.primary9,
    controlItemBgActive: baseTokens.token.primary8,

    // Components
    colorLink: baseTokens.token.primary5,
    colorLinkHover: baseTokens.token.primary4,
    colorLinkActive: baseTokens.token.primary6,
  },
  components: {
    ...baseTokens.components,
    Button: {
      colorPrimaryBg: baseTokens.token.primary9,
      colorPrimaryHover: baseTokens.token.primary8,
      colorPrimaryActive: baseTokens.token.primary7,
      colorPrimaryBorder: baseTokens.token.primary7,
    },
    Card: {
      colorBgContainer: baseTokens.token.texts9,
      colorBorderSecondary: baseTokens.token.texts8,
    },
    Input: {
      colorBgContainer: baseTokens.token.texts9,
      colorBorder: baseTokens.token.texts7,
    },
    Table: {
      colorBgContainer: baseTokens.token.texts9,
      colorBorderSecondary: baseTokens.token.texts8,
      headerBg: baseTokens.token.texts8,
    },
  },
};
