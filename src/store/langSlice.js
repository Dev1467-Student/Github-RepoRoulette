import { createSlice } from '@reduxjs/toolkit';

const getInitialLang = () => {
  const savedLang = localStorage.getItem('lang');
  if (savedLang) return savedLang;
  return 'en';
};

const langSlice = createSlice({
  name: 'lang',
  initialState: {
    current: getInitialLang()
  },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      localStorage.setItem('lang', action.payload);
      if (action.payload === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
