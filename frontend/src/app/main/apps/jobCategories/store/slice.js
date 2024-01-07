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

export const getJobCategories = createAsyncThunk(
  "jobCategories/slice/getJobCategories",
  async ({ sort, perPage, page, search }, { getState }) => {
    sort = sort || getState().jobCategories.slice.sort;
    perPage = perPage || getState().jobCategories.slice.perPage;
    page = page || getState().jobCategories.slice.page;
    search = search || getState().jobCategories.slice.searchText;

    try {
      let baseUrl = `/jobCategories?perPage=${perPage}&sort=${sort}&page=${page}`;
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

export const addJobCategory = createAsyncThunk(
  "jobCategories/slice/addJobCategory",
  async ({ formValue, resetForm }, { dispatch }) => {
    try {
      const res = await axios.post("/jobCategories", formValue);
      toast.success(res.data?.message[0]);
      dispatch(getJobCategories({ sort: "id_0" }));
      dispatch(closeNewDialog());
      resetForm();
    } catch (e) {
      toast.error(e.response?.data?.message[0].message ?? e.message);
    }
  },
);

export const updateJobCategory = createAsyncThunk(
  "jobCategories/slice/updateJobCategory",
  async ({ id, formValue, resetForm }, { dispatch }) => {
    try {
      const res = await axios.put(`/jobCategories/${id}`, formValue);
      toast.success(res.data.message[0]);
      dispatch(getJobCategories({ sort: "id_0" }));
      dispatch(closeEditDialog());
      resetForm();
    } catch (e) {
      toast.error(e.response?.data?.message[0].message ?? e.message);
    }
  },
);

export const removeJobCategory = createAsyncThunk(
  "jobCategories/slice/removeJobCategory",
  async (id, { dispatch }) => {
    const res = await apiCaller(() => axios.delete(`jobCategories/${id}`));
    toast.success(res.data.message[0]);
    dispatch(getJobCategories({}));
  },
);

const adapter = createEntityAdapter({
  selectId: (data) => data.id,
});

export const {
  selectAll: selectJobCategories,
  selectById: selectJobCategoryById,
} = adapter.getSelectors((state) => state.jobCategories.slice);

const slice = createSlice({
  name: "jobCategories/slice",
  initialState: adapter.getInitialState({
    searchText: "",
    perPage: 10,
    sort: "id_1",
    page: 1,
    meta: {},
    links: {},
    dialog: {
      type: "new",
      open: false,
      data: null,
    },
    sortOptions: [
      { sort: "title_1", label: "صعودی عنوان آگهی" },
      { sort: "title_0", label: "نزولی عنوان آگهی" },
    ],
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
    openNewDialog: (state, action) => {
      state.dialog = {
        type: "new",
        open: true,
        data: null,
      };
    },
    closeNewDialog: (state, action) => {
      state.dialog = {
        type: "new",
        open: false,
        data: null,
      };
    },
    openEditDialog: (state, action) => {
      state.dialog = {
        type: "edit",
        open: true,
        data: action.payload,
      };
    },
    closeEditDialog: (state, action) => {
      state.dialog = {
        type: "edit",
        open: false,
        data: null,
      };
    },
  },
  extraReducers: {
    [getJobCategories.fulfilled]: (state, { payload }) => {
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
    (state) => state?.jobCategories.slice[data],
    (data) => {
      return data;
    },
  );

export const {
  setSearchText,
  openNewDialog,
  closeNewDialog,
  openEditDialog,
  closeEditDialog,
  setPageConfig,
} = slice.actions;

export default slice.reducer;
