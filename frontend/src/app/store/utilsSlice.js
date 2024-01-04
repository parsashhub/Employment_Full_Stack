import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { apiCaller } from "../../reusable/axios";
import axios from "axios";
import { toast } from "react-toastify";
import {
  closeEditDialog,
  getAdvertisements,
} from "../main/apps/advertisement/store/slice";

export const getJobContracts = createAsyncThunk(
  "utils/slice/getJobContracts",
  async ({}, { dispatch }) => {
    try {
      const res = await axios.get(`/jobContracts`);
      return res.data.data;
    } catch (e) {
      toast.error(e.response?.data?.message[0].message ?? e.message);
    }
  },
);

export const getJobCategories = createAsyncThunk(
  "utils/slice/getJobCategories",
  async ({}, { dispatch }) => {
    try {
      const res = await axios.get(`/jobCategories?perPage=30&page=1`);
      return res.data.data;
    } catch (e) {
      toast.error(e.response?.data?.message[0].message ?? e.message);
    }
  },
);

const utils = createSlice({
  name: "utils",
  initialState: {
    jobContracts: [],
    jobCategories: [],
  },
  reducers: {},
  extraReducers: {
    [getJobContracts.fulfilled]: (state, { payload }) => {
      if (payload) state.jobContracts = payload;
    },
    [getJobCategories.fulfilled]: (state, { payload }) => {
      if (payload) state.jobCategories = payload;
    },
  },
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
