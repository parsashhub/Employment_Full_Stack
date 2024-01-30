/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import settingsConfig from "app/configs/settingsConfig";
import { RootStateType } from "app/store/types";
import { User } from "src/app/auth/user";
import { PartialDeep } from "type-fest";
import history from "@history";
import _ from "@lodash";

type AppRootStateType = RootStateType<userSliceType>;

let userData = JSON.parse(localStorage.getItem("user")) || null;

function updateRedirectUrl(user: any) {
  /*
                  You can redirect the logged-in user to a specific route depending on his role
               */
  if (user?.data?.loginRedirectUrl && user?.data?.loginRedirectUrl !== "") {
    settingsConfig.loginRedirectUrl = user.data.loginRedirectUrl; // for example 'apps/academy'
  }
}

export const setUser = createAsyncThunk("user/setUser", async (user: any) => {
  updateRedirectUrl(user);
  return user;
});

export const resetUser = createAsyncThunk("user/resetUser", async () => {
  history.push({
    pathname: "/",
  });
  return true;
});

const initialState = userData ? userData : null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Updates the user's settings
     */
    setUserSettings: (state, action) => {
      const oldState = _.cloneDeep(state);
      const newUser = _.setIn(
        oldState,
        "data.settings",
        action.payload,
      ) as User;

      if (_.isEqual(oldState, newUser)) {
        return undefined;
      }
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    },
    /**
     * Updates the user object in the Redux store.
     */
    updateUser: (state, { payload }) => {
      const oldState = _.cloneDeep(state);
      const newUser = _.merge({}, oldState, payload);

      if (_.isEqual(oldState, newUser)) {
        return undefined;
      }
      return newUser as User;
    },
    userSignOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.fulfilled, (state, { payload }) => {
      const newUser = _.defaults(payload, state);

      if (_.isEqual(state, newUser)) {
        return undefined;
      }
      return payload;
    });
    builder.addCase(resetUser.fulfilled, (state) => {
      return null;
    });
  },
});

export const { userSignOut, updateUser, setUserSettings } = userSlice.actions;

export const selectUser = (state: AppRootStateType) => state?.user;
export const selectUserRole = (state: AppRootStateType) => state?.user?.role;
export const selectIsUserGuest = (state: AppRootStateType) => {
  const userRole = state?.user?.role;

  return !userRole || userRole?.length === 0;
};
export const selectUserSettings = (state: AppRootStateType) =>
  state.user?.settings;
export type userSliceType = typeof userSlice;
export default userSlice.reducer;
