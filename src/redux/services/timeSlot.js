import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const timeSlotApi = createApi({
  reducerPath: "timeSlot",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getTimeSlots: builder.query({
      query: () => `getTimeSlots`,
    }),
    getTimeSlot: builder.query({
      query: (id) => `getTimeSlot?timeSlot=${id}`,
    }),
    bookTimeSlot: builder.mutation({
      query: (data) => ({
        url: `add`,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useGetTimeSlotsQuery, useGetTimeSlotQuery, useBookTimeSlotMutation } = timeSlotApi;
