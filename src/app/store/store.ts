// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import snackbarReducer from "./slices/snackbarSlice";
import authFlowReducer from "./slices/authFlowSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    authFlow: authFlowReducer,
    user: userReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
