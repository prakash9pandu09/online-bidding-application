import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginUserInfo, LoginUserRequest, LoginUserResponse } from "../common/types";

type InitialState = {
    user: LoginUserInfo,
    isLoggedIn: boolean,
    isUserNotRegistered: boolean,
    isPasswordNotValid: boolean,
}
export const initialState: InitialState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
    },
    isLoggedIn: false,
    isUserNotRegistered: false,
    isPasswordNotValid: false,
}

export const login = createAsyncThunk('login', async (loginUserData: LoginUserRequest) => {
    const loginResponse = await axios.post("http://localhost:5100/api/auth/signin", loginUserData, {withCredentials: true});
    const loginRespData: LoginUserResponse = loginResponse.data;
    return loginRespData;
});

export const logout = createAsyncThunk('logout', async () => {
    const logoutResponse = await axios.get("http://localhost:5100/api/auth/signout", {withCredentials: true});
    const logoutRespData: LoginUserResponse = logoutResponse.data;
    return logoutRespData;
});

export const getUser = createAsyncThunk('getUser', async (userId: string) => {
    const getUserResponse = await axios.get(`http://localhost:5100/api/auth/getUser?userId=${userId}`, {withCredentials: true});
    const getUserData: LoginUserResponse = getUserResponse.data;
    console.log(getUserData);
    return getUserData;
})

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser : (state, action) => {
            state.user = action.payload;
        },
        updateIsLoggedIn : (state, action) => {
            state.isLoggedIn = action.payload;
        },
        updateIsUserNotRegistered : (state, action) => {
            state.isUserNotRegistered = action.payload;
        },
        updateIsPasswordNotValid : (state, action) => {
            state.isPasswordNotValid = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload.success) {
                state.isLoggedIn = true;
                state.user = action.payload.data;
            }
            if(!action.payload.success && action.payload.status === 404) {
                state.isUserNotRegistered = true;
            }
            if(!action.payload.success && action.payload.status === 401) {
                state.isPasswordNotValid = true;
            }
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            if(action.payload.success) {
                state.isLoggedIn = false;
            }
        });
    },
});

export const {updateUser, updateIsLoggedIn, updateIsUserNotRegistered, updateIsPasswordNotValid} = userSlice.actions;

export default userSlice.reducer;