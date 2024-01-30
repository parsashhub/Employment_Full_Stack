import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { NO_DATA_FOUND } from "../../../../../reusable/messages";
import { apiCaller } from "../../../../../reusable/axios";

export const getJobCategories = createAsyncThunk(
  "jobCategories/slice/getJobCategories",
  async ({ sort, perPage, page, search }: any, { getState }: any) => {
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
  async ({ formValue, resetForm }: any, { dispatch }) => {
    try {
      const res = await axios.post("/jobCategories", formValue);
      toast.success(res.data?.message[0]);
      dispatch(getJobCategories({ sort: "id_0" }));
      // @ts-ignore
      dispatch(closeNewDialog());
      resetForm();
    } catch (e) {
      toast.error(e.response?.data?.message[0].message ?? e.message);
    }
  },
);

export const updateJobCategory = createAsyncThunk(
  "jobCategories/slice/updateJobCategory",
  async ({ id, formValue, resetForm }: any, { dispatch }) => {
    try {
      const res = await axios.put(`/jobCategories/${id}`, formValue);
      toast.success(res.data.message[0]);
      dispatch(getJobCategories({ sort: "id_0" }));
      // @ts-ignore
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

const slice = createSlice({
  name: "jobCategories/slice",
  initialState: {
    searchText: "",
    perPage: 10,
    sort: "id_1",
    page: 1,
    data: [],
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
    openEditDialog: (state, action: any) => {
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
  extraReducers: (builder) => {
    builder.addCase(getJobCategories.fulfilled, (state, { payload }) => {
      if (payload) {
        return { ...state, ...payload };
      }
    });
  },
});
export const selectData = (data: string) =>
  createSelector(
    (state) => state?.jobCategories?.slice,
    (slice) => slice?.[data],
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
