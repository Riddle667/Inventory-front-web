import { User } from "../models/user";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states";


export interface AppStore {
    user: User;
}

export default configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
    },
});