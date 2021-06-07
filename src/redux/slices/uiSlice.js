import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosAuth } from "../../axios";
import { STATUS } from "../../config";
import asyncThunkWrapper from "../asyncThunkWrapper";

export const getMenuItems = createAsyncThunk("auth/getMenuItems", 
  asyncThunkWrapper((body, accessToken) => axiosAuth(accessToken).get("/auth/getMenuItems")));


const initialState = {
  alert: {
    show: false,
    message: "",
    type: "success",
  },
  drawer: {
    list: [],
    open: false,
    status: STATUS.IDLE
  },
}
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.alert = action.payload;
    },
    toggleDrawer(state) {
      state.drawer.open = !state.drawer.open;
    },
  },
  extraReducers: {
    [getMenuItems.pending]: (state) => {
      state.drawer.status = STATUS.LOADING;
    },
    [getMenuItems.fulfilled]: (state, action) => {
      state.drawer.status = STATUS.SUCCEEDED;
      state.drawer.list = action.payload;
    },
    [getMenuItems.rejected]: (state, action) => {
      state.drawer.status = STATUS.FAILED;
      state.error = action.message;
    },
  },
});

export const { showAlert, toggleDrawer } = uiSlice.actions;

export const uiAlertState = (state) => state.ui.alert;
export const uiDrawerState = (state) => state.ui.drawer;

export default uiSlice.reducer;
