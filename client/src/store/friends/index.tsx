import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addFriendType {
  name: string;
  email: string;
  _id: string;
  hashId: string;
}

export interface friendSliceType {
  addFriendData: addFriendType[];
  friendRequestsData: pendingRequestsData[];
  page: number;
  pages: number;
  totalFriends: number;
  requestPage: number;
  requestPages: number;
  totalRequests: number;
}

export interface pendingRequestsData {
  _id: string;
  name: string;
  hashId: string;
  email: string;
  status: string;
  userId: string;
}

const initialState: friendSliceType = {
  addFriendData: [],
  friendRequestsData: [],
  page: 1,
  pages: 1,
  totalFriends: 0,
  requestPage: 1,
  requestPages: 1,
  totalRequests: 0,
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
    setPage(state, action: PayloadAction<{ page: number }>) {
      const { page } = action.payload;
      state.page = page;
    },
    setPages(state, action: PayloadAction<{ pages: number }>) {
      const { pages } = action.payload;
      state.pages = pages;
    },
    setTotalFriends(state, action: PayloadAction<{ totalFriends: number }>) {
      const { totalFriends } = action.payload;
      state.totalFriends = totalFriends;
    },
    setRequetsData(
      state,
      action: PayloadAction<{ requestData: pendingRequestsData[] }>
    ) {
      const { requestData } = action.payload;
      state.friendRequestsData = [...requestData];
    },
    setRequestPage(state, action: PayloadAction<{ page: number }>) {
      const { page } = action.payload;
      state.requestPage = page;
    },
    setRequestPages(state, action: PayloadAction<{ pages: number }>) {
      const { pages } = action.payload;
      state.requestPages = pages;
    },
    setTotalPendingRequests(
      state,
      action: PayloadAction<{ totalRequest: number }>
    ) {
      const { totalRequest } = action.payload;
      state.totalRequests = totalRequest;
    },
  },
});

export const {
  setAddFriendData,
  setPage,
  setPages,
  setTotalFriends,
  setRequestPage,
  setRequestPages,
  setRequetsData,
  setTotalPendingRequests,
} = friendsSlice.actions;

export default friendsSlice.reducer;
