import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  users: IUser[] | [],
  currentUser: IUser | null
  deleteModalOpen: boolean
};

const initialState: InitialState = {
  users: [],
  currentUser: null,
  deleteModalOpen: false
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },

    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      console.log("Setting Current User:", action.payload);
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },

    removeUser: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.filter((user) => user._id !== action.payload._id);
    },

    setDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteModalOpen = action.payload;
    }
  },
});

export const { removeUser, setUsers, setCurrentUser, removeCurrentUser, setDeleteModalOpen } = usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
