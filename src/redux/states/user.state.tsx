import { createSlice, Slice } from "@reduxjs/toolkit";
import { User } from "../../models/user";


export const UserEmptyState: User = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
};

export const userSlice: Slice<User> = createSlice({
    name: "user",
    initialState: UserEmptyState,
    reducers: {
        createUser: (state, action) => action.payload,
        modifyUser: (state, action) => ({ ...state, ...action.payload }),
        resetUser: () => UserEmptyState,
    },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;