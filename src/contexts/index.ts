import React from 'react';
import { AppContextParam } from '../types';

export const UserContext = React.createContext(null);
export const AppContext = React.createContext<AppContextParam>({
  state: {},
  dispatch: () => {},
});

export default {
  UserContext,
  AppContext,
};
