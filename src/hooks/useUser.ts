import { useCallback } from "react";
import {
  fetchUserInfo,
  fetchAvatars,
  chooseAvatar,
  clearUserError,
} from "../app/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { RootState } from "../app/store/store";
import { UserInfo } from "../types/types/user.type";

const useUser = () => {
  const dispatch = useAppDispatch();

  // Select entire user state
  const userState = useAppSelector((state: RootState) => state.user);

  // Individual state selectors
  const userInfo = useAppSelector((state: RootState) => state.user.info);
  const avatars = useAppSelector((state: RootState) => state.user.avatars);
  const loading = useAppSelector((state: RootState) => state.user.loading);
  const error = useAppSelector((state: RootState) => state.user.error);

  // Action dispatchers
  const getUserInfo = useCallback(() => {
    return dispatch(fetchUserInfo());
  }, [dispatch]);

  const getAvatars = useCallback(() => {
    return dispatch(fetchAvatars());
  }, [dispatch]);

  const selectAvatar = useCallback(
    (avatarUrl: string) => {
      return dispatch(chooseAvatar(avatarUrl));
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  return {
    // State
    state: userState,
    userInfo,
    avatars,
    loading,
    error,

    // Actions
    getUserInfo,
    getAvatars,
    selectAvatar,
    clearError,

    // Status flags
    isUserInfoLoading: loading && userInfo === null,
    isAvatarsLoading: loading && avatars.length === 0,

    // Convenience methods
    updateUserInfo: (info: Partial<UserInfo>) => {
      if (userInfo) {
        // Create a new user info object with updated fields
        const updatedInfo = { ...userInfo, ...info };
        // In a real app, you would dispatch an update action to the server
        // For now, we'll just update the local state
        // This is a temporary solution until you implement proper update logic
        return updatedInfo;
      }
      return userInfo;
    },
  };
};

export default useUser;
