import { createSlice } from "@reduxjs/toolkit";

import { UserInfo, UserInitalState } from "../../../models";

import { getUserDetails, loginUser, registerUser } from "./userActionsSlice";

const userToken: UserInfo["token"] = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  userInfo: {},
  token: userToken && JSON.parse(userToken),
  error: null,
  success: false,
} as UserInitalState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token"); // delete token from storage
      state.loading = false;
      state.userInfo = {} as UserInfo;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      if (payload?.message) state.error = payload.message;
      state.loading = false;
    });

    // loggin user

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;

      state.token = payload.token ? payload?.token : "";
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.loading = false;
    });

    //get current user
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      // state.token = payload.token ? payload?.token : "";
    });

    builder.addCase(getUserDetails.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
