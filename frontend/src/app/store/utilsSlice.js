import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiCaller } from "../../reusable/axios";
import axios from "axios";

const utils = createSlice({
  name: "utils",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const selectUtilsData = (data) =>
  createSelector(
    (state) => state?.utils[data],
    (data) => {
      return data;
    },
  );

export const { callFocus, callCategories } = utils.actions;

export default utils.reducer;
