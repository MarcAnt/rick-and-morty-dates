import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserInfo } from "../../../models";
import { createUser, getUser, siginUser } from "../../../services";

type FetchUsersError = {
  message: string;
};

export const loginUser = createAsyncThunk<
  UserInfo,
  { email: string },
  { rejectValue: FetchUsersError }
>("user/login", async ({ email }, thunkApi) => {
  return await siginUser({ email }).then((response) => {
    // Check if status is not okay:
    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: "Failed to signin.",
      });
    }
    // localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    return response.data;
  });
});

export const registerUser = createAsyncThunk<
  UserInfo,
  { name: string; email: string },
  { rejectValue: FetchUsersError }
>("user/register", async ({ name, email }, thunkApi) => {
  return await createUser({ name, email }).then((response) => {
    // Check if status is not okay:
    if (response.status !== 201) {
      // Return the error message:
      const { msg } = response?.response?.data;

      return thunkApi.rejectWithValue({
        message: msg ? msg : "Failed to fetch user.",
        // message: "Failed to fetch user.",
      });
    }
    return response.data;
  });
});

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (token: string, { rejectWithValue }) => {
    // const user = getState();

    // console.log(user.user);

    return await getUser(token).then((response) => {
      // Check if status is not okay:
      if (response.status !== 200) {
        // Return the error message:
        return rejectWithValue({
          message: "Failed to fetch user",
        });
      }

      return response.data;
    });
  }
);
