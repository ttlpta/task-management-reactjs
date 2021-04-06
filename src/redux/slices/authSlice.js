import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    isLogined: false,
  },
  reducers: {
    login: (state) => {
      state.isLogined = true;
    },
  },
});

export const { login } = counterSlice.actions;

export default counterSlice.reducer;
