import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    alert: {
      show: false,
      message: "",
      type: "success",
    },
  },
  reducers: {
    showAlert(state, action) {
      state.alert = action.payload;
    }
  },
});

export const { showAlert } = uiSlice.actions;

export const uiAlertState = (state) => state.ui.alert;
export default uiSlice.reducer;
