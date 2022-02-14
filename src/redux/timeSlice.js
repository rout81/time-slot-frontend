import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTime: null,
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setCurrentTime: (state, action) => {
      state.value = action.payload;
    },
    clearCurrentTime: (state) => {
      state.value = null;
    },
  },
});

export const { setCurrentTime, clearCurrentTime } = timeSlice.actions;

export default timeSlice.reducer;
