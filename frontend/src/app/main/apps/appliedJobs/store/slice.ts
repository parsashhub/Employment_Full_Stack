import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { NO_DATA_FOUND } from "../../../../../reusable/messages";

export const getAppliedJobs = createAsyncThunk(
  "appliedJobs/slice/getAppliedJobs",
  async ({ sort, perPage, page, search }: any, { getState }: any) => {
    sort = sort || getState().appliedJobs.slice.sort;
    perPage = perPage || getState().appliedJobs.slice.perPage;
    page = page || getState().appliedJobs.slice.page;
    search = search || getState().appliedJobs.slice.searchText;

    try {
      let baseUrl = `/resumes/appliedJob?perPage=${perPage}&sort=${sort}&page=${page}`;
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

export const updateResumeState = createAsyncThunk(
  "appliedJobs/slice/updateResumeState",
  async ({ id, formValue }: any, { dispatch }: any) => {
    try {
      const res = await axios.put(`/resumes/changeResumeState/${id}`, formValue);
      toast.success(res.data.message[0]);
      dispatch(getAppliedJobs({}));
    } catch (e) {
      toast.error(e.response?.data?.message[0] ?? e.message);
    }
  },
);

const slice = createSlice({
  name: "appliedJobs/slice",
  initialState: {
    searchText: "",
    perPage: 10,
    sort: "id_1",
    page: 1,
    data: [],
    meta: {},
    links: {},
    sortOptions: [],
  },
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      // @ts-ignore
      prepare: (event) => ({ payload: event?.target.value || "" }),
    },
    setPageConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppliedJobs.fulfilled, (state, { payload }) => {
      if (payload) {
        return { ...state, ...payload };
      }
    });
  },
});

export const selectData = (data: string) =>
  createSelector(
    (state) => state?.appliedJobs?.slice,
    (slice) => slice?.[data],
  );

export const { setSearchText, setPageConfig } = slice.actions;

export default slice.reducer;
