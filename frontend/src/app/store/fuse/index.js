import { combineReducers } from '@reduxjs/toolkit';
import dialog from './dialogSlice';
import navbar from './navbarSlice';
import navigation from './navigationSlice';
import settings from './settingsSlice';

const fuseReducers = combineReducers({
  navigation,
  settings,
  navbar,
  dialog,
});

export default fuseReducers;
