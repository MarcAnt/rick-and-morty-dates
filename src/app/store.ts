import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import charactersReducer from "./features/characters/charactersSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    characters: charactersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
