import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    currentArticle: null,
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
  },
});

export const { setArticles, setCurrentArticle } = articleSlice.actions;
export default articleSlice.reducer;
