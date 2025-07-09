// src/types/api.type.ts
/**
 * API Configuration Constants
 *
 * Defines all API endpoints with dynamic base URL construction
 * Supports both custom IP and localhost development environments
 */
const customIP = ""; // Set to custom IP if deploying to external server
const port = "8000";
const baseURL = "/api/v1";

// Constructs base URL for devices endpoints
const devicesBaseURL = customIP
  ? `http://${customIP}:${port}${baseURL}/devices`
  : `http://localhost:${port}${baseURL}/devices`;

// Constructs base URL for users endpoints
const usersBaseURL = customIP
  ? `http://${customIP}:${port}${baseURL}/users`
  : `http://localhost:${port}${baseURL}/users`;

const API = {
  // ======================
  // DEVICE MANAGEMENT APIS
  // ======================

  /**
   * POST: Logout current device
   * Requires authentication token in header
   */
  postLogOut: `${devicesBaseURL}/logout`,

  /**
   * POST: Logout all user devices
   * Requires authentication token in header
   */
  postLogOutAll: `${devicesBaseURL}/logout-all`,

  // =================
  // USER MANAGEMENT APIS
  // =================

  /**
   * GET: Fetch available avatars
   * No authentication required
   */
  getAvatars: `${usersBaseURL}/avatar`,

  /**
   * POST: Set user's avatar
   * Requires authentication token in header
   * @param {string} avatar - URL of selected avatar
   */
  postChooseAvatar: `${usersBaseURL}/avatar`,

  /**
   * POST: Check if phone number exists
   * @param {string} number - Phone number to check
   */
  postCheckNumber: `${usersBaseURL}/check-number`,

  /**
   * GET: Get authenticated user's info
   * Requires authentication token in header
   */
  getUserInfo: `${usersBaseURL}/info`,

  /**
   * POST: Authenticate user
   * @param {string} number - User's phone number
   * @param {string} password - User's password
   */
  postLogIn: `${usersBaseURL}/login`,

  /**
   * POST: Refresh access token
   * @param {string} refresh - Refresh token
   */
  postRefresh: `${usersBaseURL}/refresh`,

  /**
   * POST: Reset user password
   * @param {string} number - User's phone number
   * @param {string} token - Verification token
   * @param {string} password - New password
   */
  postResetPassword: `${usersBaseURL}/reset-password`,

  /**
   * POST: Send OTP to phone number
   * @param {string} number - Phone number to verify
   */
  postSendOTP: `${usersBaseURL}/send-otp`,

  /**
   * POST: Register new user
   * @param {string} number - User's phone number
   * @param {string} name - User's full name
   * @param {string} token - Verification token
   * @param {string} password - User's password
   */
  postSignUp: `${usersBaseURL}/signup`,

  /**
   * POST: Verify OTP code
   * @param {string} number - Phone number to verify
   * @param {number} otp - OTP code received
   * @param {string} token - Verification token
   * @param {string} mode - Verification mode ('signup' or 'reset_password')
   */
  postVerifyOTP: `${usersBaseURL}/verify-otp`,
};

export default API;
