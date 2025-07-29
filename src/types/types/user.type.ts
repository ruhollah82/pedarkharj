export interface UserInfo {
  id: string;
  name: string;
  number: string;
  avatar?: string;
}

export interface UserState {
  info: UserInfo | null;
  avatars: string[];
  loading: boolean;
  error: string | null;
}
