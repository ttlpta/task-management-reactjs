import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosAuth } from "../../axios";
import { STATUS } from "../../config";
import { taskAdapter } from "../entities/task";
import asyncThunkWrapper from "../asyncThunkWrapper";

export const getTasks = createAsyncThunk(
  "tasks/getList",
  asyncThunkWrapper((body, token) => axiosAuth(token).get("/tasks"))
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  asyncThunkWrapper((body, token) => axiosAuth(token).post("/tasks", body))
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  asyncThunkWrapper((body, token) => axiosAuth(token).patch(`/tasks/${body.id}`, body))
);


export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  asyncThunkWrapper((id, token) => axiosAuth(token).get(`/tasks/${id}`))
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
      state.status = STATUS.SUCCEEDED;
      taskAdapter.upsertMany(state, action.payload);
    },
    [getTasks.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.message;
    },
    [createTask.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [createTask.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      taskAdapter.upsertOne(state, action.payload);
    },
    [createTask.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.message;
    },
    [getTaskById.pending]: (state) => {
      state.status = STATUS.LOADING
    },
    [getTaskById.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
    },
    [getTaskById.rejected]: (state, action) => {
      state.status = STATUS.LOADING;
      state.error = action.message;
    },
    [updateTask.pending]: (state) => {
      state.status = STATUS.LOADING
    },
    [updateTask.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      taskAdapter.upsertOne(state, action.payload);
    },
    [updateTask.rejected]: (state, action) => {
      state.status = STATUS.LOADING;
      state.error = action.message;
    }
  },
});
// export const { logout } = taskSlice.actions;
export const taskState = (state) => state.task;
export const taskStatus = (state) => state.task.status;
export const {
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = taskAdapter.getSelectors((state) => state.task)

export default taskSlice.reducer;
