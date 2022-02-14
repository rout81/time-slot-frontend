import { configureStore } from "@reduxjs/toolkit";
import { timeSlotApi } from "./services/timeSlot";
import timeReducer from "./timeSlice";

export const store = configureStore({
  reducer: {
    time: timeReducer,
    [timeSlotApi.reducerPath]: timeSlotApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(timeSlotApi.middleware),
});
