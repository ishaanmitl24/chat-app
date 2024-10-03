import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addFriendType {
  name: string;
  email: string;
  id: string;
  hashId: string;
}

export interface friendSliceType {
  addFriendData: addFriendType[];
}

const initialState: friendSliceType = {
  addFriendData: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setAddFriendData(
      state,
      action: PayloadAction<{ addFriendUserData: addFriendType[] }>
    ) {
      const { addFriendUserData } = action.payload;
      state.addFriendData = [...addFriendUserData];
    },
  },
});

export const { setAddFriendData } = friendsSlice.actions;

export default friendsSlice.reducer;
