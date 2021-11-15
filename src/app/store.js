import { configureStore } from "@reduxjs/toolkit"
import saveArticleReducer from "../features/Article/saveArticleSlice"
import saveKeywordReducer from "../features/Article/saveKeywordSlice"

export const store = configureStore({
  reducer: {
    article: saveArticleReducer,
    keyword: saveKeywordReducer,
  },
})
