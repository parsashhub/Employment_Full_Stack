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

export const getAdvertisements = createAsyncThunk(
  "advertisement/slice/getAdvertisements",
  async ({ sort, perPage, page, search }, { getState }) => {
    sort = sort || getState().advertisement.slice.sort;
    perPage = perPage || getState().advertisement.slice.perPage;
    page = page || getState().advertisement.slice.page;
    search = search || getState().advertisement.slice.searchText;

    try {
      let baseUrl = `/advertisements?perPage=${perPage}&sort=${sort}&page=${page}`;
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

export const addAdvertisement = createAsyncThunk(
  "advertisement/slice/addAdvertisement",
  async ({ formValue, resetForm }, { dispatch }) => {
    try {
      const res = await axios.post("/advertisements", formValue);
      toast.success(res.data?.message[0]);
      dispatch(getAdvertisements({ sort: "createdAt_0" }));
      dispatch(closeNewDialog());
      resetForm();
    } catch (e) {
      toast.error(
        e.response?.data?.message?.details[0] ?? e.response?.data?.message[0],
      );
    }
  },
);

export const updateAdvertisement = createAsyncThunk(
  "advertisement/slice/updateAdvertisement",
  async ({ id, formValue, resetForm }, { dispatch }) => {
    try {
      const res = await axios.put(`/advertisements/${id}`, formValue);
      toast.success(res.data.message[0]);
      dispatch(getAdvertisements({ sort: "updatedAt_0" }));
      dispatch(closeEditDialog());
      resetForm();
    } catch (e) {
      toast.error(e.response?.data?.message[0] ?? e.message);
    }
  },
);

export const removeAdvertisement = createAsyncThunk(
  "advertisement/slice/removeAdvertisement",
  async (id, { dispatch }) => {
    const res = await apiCaller(() => axios.delete(`advertisements/${id}`));
    toast.success(res.data.message[0]);
    dispatch(getAdvertisements({}));
  },
);

const adapter = createEntityAdapter({
  selectId: (data) => data.id,
});

export const {
  selectAll: selectAdvertisements,
  selectById: selectAdvertisementById,
} = adapter.getSelectors((state) => state.advertisement.slice);

const slice = createSlice({
  name: "advertisement/slice",
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
      { sort: "salary_1", label: "بیشترین حقوق" },
      { sort: "createdAt_0", label: "جدید ترین آگهی ها" },
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
    [getAdvertisements.fulfilled]: (state, { payload }) => {
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
    (state) => state?.advertisement.slice[data],
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
