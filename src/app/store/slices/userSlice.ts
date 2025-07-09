// src/store/slices/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../services/API/apiList";

interface UserInfo {
  id: string;
  name: string;
  number: string;
  avatar?: string;
}

interface UserState {
  info: UserInfo | null;
  avatars: string[]; // List of available avatar URLs
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  info: null,
  avatars: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchUserInfo = createAsyncThunk(
  "user/fetchInfo",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: { token: string | null } };
      const response = await axios.get(API.getUserInfo, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return response.data as UserInfo;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "User info fetch failed");
    }
  }
);

export const checkNumber = createAsyncThunk(
  "user/checkNumber",
  async (number: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(API.postCheckNumber, { number });
      return response.data.exists as boolean;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Number check failed");
    }
  }
);

export const fetchAvatars = createAsyncThunk(
  "user/fetchAvatars",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.getAvatars);
      return response.data as string[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Avatars fetch failed");
    }
  }
);

export const chooseAvatar = createAsyncThunk(
  "user/chooseAvatar",
  async (avatar: string, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: { token: string | null } };
      await axios.post(
        API.postChooseAvatar,
        { avatar },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      return avatar;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Avatar selection failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Avatars
      .addCase(fetchAvatars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvatars.fulfilled, (state, action) => {
        state.loading = false;
        state.avatars = action.payload;
      })
      .addCase(fetchAvatars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Choose Avatar
      .addCase(chooseAvatar.fulfilled, (state, action) => {
        if (state.info) {
          state.info.avatar = action.payload;
        }
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
