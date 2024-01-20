import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { NO_DATA_FOUND } from "../../../../../reusable/messages";
import { apiCaller } from "../../../../../reusable/axios";

export const getAppliedJobs = createAsyncThunk(
  "appliedJobs/slice/getAppliedJobs",
  async ({ sort, perPage, page, search }, { getState }) => {
    sort = sort || getState().appliedJobs.slice.sort;
    perPage = perPage || getState().appliedJobs.slice.perPage;
    page = page || getState().appliedJobs.slice.page;
    search = search || getState().appliedJobs.slice.searchText;

    try {
      let baseUrl = `/users/appliedJob?perPage=${perPage}&sort=${sort}&page=${page}`;
      const response = await axios.get(
        search ? `${baseUrl}&search=${search}` : baseUrl,
      );

      if (response.data?.data.length === 0) toast.info(NO_DATA_FOUND);

      return { ...response?.data, sort, perPage, page };
    } catch (error) {
      toast.error(error.message);
    }
  },
);

const adapter = createEntityAdapter({
  selectId: (data) => data.id,
});

export const {
  selectAll: selectAppliedJobs,
  selectById: selectAppliedJobById,
} = adapter.getSelectors((state) => state.appliedJobs.slice);

const slice = createSlice({
  name: "appliedJobs/slice",
  initialState: adapter.getInitialState({
    searchText: "",
    perPage: 10,
    sort: "id_1",
    page: 1,
    meta: {},
    links: {},
    sortOptions: [],
  }),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event?.target.value || "" }),
    },
    setPageConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [getAppliedJobs.fulfilled]: (state, { payload }) => {
      if (payload) {
        const { data, links, page, sort, perPage, meta } = payload;
        adapter.setAll(state, data);

        state.page = page;
        state.meta = meta;
        state.sort = sort;
        state.links = links;
        state.perPage = perPage;
      }
    },
  },
});

export const selectData = (data) =>
  createSelector(
    (state) => state?.appliedJobs.slice[data],
    (data) => {
      return data;
    },
  );

export const { setSearchText, setPageConfig } = slice.actions;

export default slice.reducer;
