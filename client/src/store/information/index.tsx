import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface informationData {
  message: string;
  error: string;
  loading: boolean;
}

const initialState: informationData = {
  message: "",
  error: "",
  loading: false,
};

const informationSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<{ message: string }>) {
      state.message = action.payload.message;
    },
    setError(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      state.loading = action.payload.loading;
    },
  },
});

export const { setError, setMessage, setLoading } = informationSlice.actions;

export default informationSlice.reducer;
