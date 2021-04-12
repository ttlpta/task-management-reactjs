import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosAuth } from "../../axios";
import { STATUS } from "../../config";

export const getMenuItems = createAsyncThunk(
  "auth/getMenuItems",
  async (body, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const { data } = await axiosAuth(accessToken).get("/auth/getMenuItems");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
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
  },
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
