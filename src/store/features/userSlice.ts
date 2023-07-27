import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  users: IUser[],
  currentUser: IUser | null
  deleteModalOpen: boolean
  searchTerm: string
  filteredUsers: IUser[]
};

const initialState: InitialState = {
  users: [],
  currentUser: null,
  deleteModalOpen: false,
  searchTerm: "",
  filteredUsers: []
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },

    setCurrentUser: (state, action: PayloadAction<IUser>) => {
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
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      if (action.payload === "") {
        state.filteredUsers = [];
      } else {
        state.filteredUsers = state.users.filter((user) => {
          return user.firstName.toLowerCase().includes(action.payload.toLowerCase()) || user.lastName.toLowerCase().includes(action.payload.toLowerCase());
        });
      }
    }
  },
});

export const { removeUser, setUsers, setCurrentUser, removeCurrentUser, setDeleteModalOpen, setSearchTerm } = usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
