import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  users: IUser[] | [],
  currentUser: IUser | null
};

const initialState: InitialState = {
  users: [],
  currentUser: null,
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

    removeUser: (state) => {

    },
  },
});

export const { removeUser, setUsers, setCurrentUser, removeCurrentUser } = usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
