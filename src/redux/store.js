import { configureStore, createSlice } from "@reduxjs/toolkit";

export const EmployeeReducerSlice = createSlice({
  name: "employeeCrud",
  initialState: {
    client: { toggleForm: false, updateID: undefined },
  },
  reducers: {
    toggleChangeAction: (state, action) => {
      state.client.toggleForm = action.payload || !state.client.toggleForm;
    },
    updateAction: (state, action) => {
      state.client.updateID = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction } =
  EmployeeReducerSlice.actions;

export default configureStore({
  reducer: EmployeeReducerSlice.reducer,
});
