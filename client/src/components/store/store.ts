import { configureStore } from "@reduxjs/toolkit/react";
import  userReducer from "./userSlice";
import biddingReducer from './biddingsSlice';
export const store = configureStore({
    reducer:{
        user: userReducer,
        bidding: biddingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;