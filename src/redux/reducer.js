import { createSlice } from "@reduxjs/toolkit";

export const EmployeeReducerSlice = createSlice({
  name: "employeeCrud",
  initialState: {
    client: { formVisible: false, updateID: undefined, deleteId: null },
  },
  reducers: {
    toggleChangeAction: (state, action) => {
      state.client.formVisible = action.payload
        ? true
        : !state.client.formVisible;
    },
    updateAction: (state, action) => {
      state.client.updateID = action.payload;
    },
    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } =
  EmployeeReducerSlice.actions;

export default EmployeeReducerSlice.reducer;
