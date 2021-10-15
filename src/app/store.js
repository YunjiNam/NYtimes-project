import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "../features/Search/searchSlice"
import saveArticleReducer from "../features/Article/saveArticleSlice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    article: saveArticleReducer,
  },
})
