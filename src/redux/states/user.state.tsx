import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { clearLocalStorage, persistLocalStorage } from "@/utilities";


export const UserEmptyState: User = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    image: "",
    session_token: "",
    createdAt: ""
};

export const UserKey = "user";

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : UserEmptyState,
    reducers: {
      createUser: (state, action) => {
        persistLocalStorage<User>(UserKey, action.payload);
        return action.payload;
      },
      modifyUser: (state, action) => {
        const result = { ...state, ...action.payload };
        persistLocalStorage<User>(UserKey, result);
        return result;
      },
      resetUser: () => {
        clearLocalStorage(UserKey);
        return UserEmptyState;
      }
    }
  });

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;