import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import repoReducer from './repoSlice';
import langReducer from './langSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    repo: repoReducer,
    lang: langReducer,
  },
});
