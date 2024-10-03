import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authType {
  isAuthenticated: boolean;
  token: string;
  email: string;
  name: string;
  userId: string;
}

const initialState: authType = {
  isAuthenticated: false,
  token: "",
  email: "",
  name: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    settAuthUserData(state, action: PayloadAction<authType>) {
      const { isAuthenticated, token, name, email, userId } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.token = token;
      state.name = name;
      state.email = email;
      state.userId = userId;
    },
  },
});

export const { settAuthUserData } = authSlice.actions;

export default authSlice.reducer;
