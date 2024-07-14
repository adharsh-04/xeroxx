import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userAdminLoginThunk = createAsyncThunk('user-admin-login', async (userCredObj, thunkApi) => {
    try {
        let res;
        if (userCredObj.type === 'user') {
            res = await axios.post('http://localhost:3000/userapi/login', userCredObj);
        } else if (userCredObj.type === 'admin') {
            res = await axios.post('http://localhost:3000/adminapi/login', userCredObj);
        }

        if (res.data.message === 'Login successful' || res.data.message === 'login success') {
            localStorage.setItem('token', res.data.token);
            return res.data;
        } else {
            return thunkApi.rejectWithValue(res.data.message);
        }
    } catch (err) {
        return thunkApi.rejectWithValue(err.response ? err.response.data.message : err.message);
    }
});

export const userAdminSlice = createSlice({
    name: "user-admin-login",
    initialState: {
        isPending: false,
        loginUserStatus: false,
        currentUser: {},
        errorOccured: false,
        errMsg: ''
    },
    reducers: {
        resetState: (state) => {
            state.isPending = false;
            state.currentUser = {};
            state.loginUserStatus = false;
            state.errorOccured = false;
            state.errMsg = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userAdminLoginThunk.pending, (state) => {
            state.isPending = true;
        }).addCase(userAdminLoginThunk.fulfilled, (state, action) => {
            state.isPending = false;
            state.currentUser = action.payload.user;
            state.loginUserStatus = true;
            state.errMsg = '';
            state.errorOccured = false;
        }).addCase(userAdminLoginThunk.rejected, (state, action) => {
            state.isPending = false;
            state.currentUser = {};
            state.loginUserStatus = false;
            state.errMsg = action.payload;
            state.errorOccured = true;
        });
    }
});

export const { resetState } = userAdminSlice.actions;
export default userAdminSlice.reducer;
