// src/store/slices/userSliceTypes.ts
export interface UserInfo {
  id: string;
  name: string;
  number: string;
  avatar?: string;
}

export interface UserState {
  info: UserInfo | null;
  avatars: string[]; // List of available avatar URLs
  loading: boolean;
  error: string | null;
}
