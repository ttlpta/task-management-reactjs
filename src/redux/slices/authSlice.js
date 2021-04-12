import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { STATUS } from "../../config";
import asyncThunkWrapper from "../asyncThunkWrapper";

export const login = createAsyncThunk(
  "auth/login",
  asyncThunkWrapper((body) => axios.post("/auth/login", body))
);

const initialState = {
  accessToken: "",
  refreshToken: "",
  status: STATUS.IDLE,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [login.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    },
    [login.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.message;
    },
  },
});
export const { logout } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
