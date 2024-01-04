import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: 0,
  },
  reducers: {
    showLoader: ({ isLoading }) => {
      return { isLoading: isLoading + 1 };
    },
    hideLoader: ({ isLoading }) => {
      return { isLoading: isLoading - 1 };
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
