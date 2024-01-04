/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import {
  setDefaultSettings,
  setInitialSettings,
} from "app/store/fuse/settingsSlice";
import settingsConfig from "app/configs/settingsConfig";
import jwtService from "../auth/services/jwtService";

const userData = JSON.parse(localStorage.getItem("user")) || null;

export const setUser = createAsyncThunk(
  "user/setUser",
  async (user, { dispatch, getState }) => {
    if (user.loginRedirectUrl) {
      settingsConfig.loginRedirectUrl = user.loginRedirectUrl;
    }

    if (userData) {
      return {
        data: userData.data,
        role: userData.role,
        settings: userData.settings ?? null,
      };
    }
    return { data: user.data, role: user.data.role, settings: null };
  },
);

export const updateUserData = createAsyncThunk(
  "user/updateUser",
  async (data, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      settings: user.settings,
      role: data.role,
      data: data,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  },
);

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    localStorage.setItem(
      "user",
      JSON.stringify({
        settings: settings,
        role: user.role,
        data: user.data,
      }),
    );

    return settings;
  },
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: "/",
  });

  dispatch(setInitialSettings());
  return dispatch(userLoggedOut());
};

const initialState = userData
  ? userData
  : {
      role: [],
      data: {},
      settings: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => {
      return {
        role: [],
        data: {},
        settings: {},
      };
    },
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, { payload }) => {
      state.settings = payload;
    },
    [setUser.fulfilled]: (state, { payload }) => {
      state.role = payload.role;
      state.data = payload.data;
      state.settings = payload.settings;
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

export const { userLoggedOut } = userSlice.actions;
export const selectUser = ({ user }) => user;

export default userSlice.reducer;
