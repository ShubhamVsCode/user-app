import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import dayjs from "dayjs";

type InitialState = {
  users: IUser[],
  currentUser: IUser | null
  deleteModalOpen: boolean
  searchTerm: string
  filteredUsers: IUser[]
  usersFromCSV: IUser[]
  sortOption: string
};

const initialState: InitialState = {
  users: [],
  currentUser: null,
  deleteModalOpen: false,
  searchTerm: "",
  filteredUsers: [],
  usersFromCSV: [],
  sortOption: ""
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
      state.filteredUsers = action.payload
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
      state.searchTerm = action.payload.trim();
      if (action.payload === "") {
        state.filteredUsers = state.users;
      } else {
        state.filteredUsers = state.users.filter((user) => {
          return user.firstName.toLowerCase().includes(action.payload.trim().toLowerCase()) || user.lastName.toLowerCase().includes(action.payload.trim().toLowerCase());
        });
      }
    },

    setUsersFromCSV: (state, action: PayloadAction<IUser[]>) => {
      console.log(action.payload);
      state.usersFromCSV = action.payload
    },

    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload

      switch (state.sortOption) {
        case "nameAsc":
          state.filteredUsers.sort((a, b) => {
            return a.firstName.localeCompare(b.firstName);
          })
          break;

        case "nameDesc":
          state.filteredUsers.sort((a, b) => {
            return b.firstName.localeCompare(a.firstName);
          })
          break;

        case "ageAsc":
          state.filteredUsers.sort((a, b) => {
            return a.age - b.age;
          })
          break;

        case "ageDesc":
          state.filteredUsers.sort((a, b) => {
            return b.age - a.age;
          })
          break;

        case "createdAtAsc":
          state.filteredUsers.sort((a, b) => {
            const dateA = dayjs(a.createdAt);
            const dateB = dayjs(b.createdAt);
            return dateA.diff(dateB);
          });
          break;

        case "createdAtDesc":
          state.filteredUsers.sort((a, b) => {
            const dateA = dayjs(a.createdAt);
            const dateB = dayjs(b.createdAt);
            return dateB.diff(dateA);
          });
          break;

        case "none":
          state.filteredUsers = state.users
          break;

        default:
          state.filteredUsers = state.users
      }

    }
  },
});

export const { removeUser, setUsers, setCurrentUser, removeCurrentUser, setDeleteModalOpen, setSearchTerm, setUsersFromCSV, setSortOption } = usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
