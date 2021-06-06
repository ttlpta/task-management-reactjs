import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { normalize } from 'normalizr';

import { axiosAuth } from "../../axios";
import { STATUS } from "../../config";
import taskEntity, { taskAdapter } from "../entities/task";
import asyncThunkWrapper from "../asyncThunkWrapper";

export const getTasks = createAsyncThunk(
  "tasks/getList",
  asyncThunkWrapper((body, token) => axiosAuth(token).get("/tasks"))
);


const initialState = taskAdapter.getInitialState({
  status: STATUS.IDLE
})

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getTasks.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [getTasks.fulfilled]: (state, action) => {
      const normalized = normalize(action.payload, [taskEntity]);
      state.status = STATUS.SUCCEEDED
      taskAdapter.upsertMany(state, normalized.entities.task);

    },
    [getTasks.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.message;
    },
  },
});
// export const { logout } = taskSlice.actions;

export const taskStatus = (state) => state.task.status;
export const {
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = taskAdapter.getSelectors((state) => state.task)

export default taskSlice.reducer;
