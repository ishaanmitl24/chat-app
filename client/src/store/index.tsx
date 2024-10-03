import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./auth";
import information from "./information";
import friends from "./friends";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    info: information,
    friend: friends,
  },
});

type AppDispatchType = typeof store.dispatch;
type AppSelectorType = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
export const useAppSelector = useSelector.withTypes<AppSelectorType>();
