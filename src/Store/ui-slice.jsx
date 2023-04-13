import { createSlice } from "@reduxjs/toolkit";

const initialState = { isVisible: false, status: "", message: "" };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.isVisible = true;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export default uiSlice.reducer;
export const { showNotification } = uiSlice.actions;
