export type UserInfo = {
  name: string;
  email: string;
  token?: string | null;
};

export type UserInitalState = {
  loading: boolean;
  userInfo: UserInfo;
  status: boolean;
  error: string | null;
  token: string | null;
  success: boolean;
};
