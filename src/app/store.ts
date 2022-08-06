import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import charactersReducer from "./features/user/charactersSlice";
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // posts: postsReducer,
    characters: charactersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
