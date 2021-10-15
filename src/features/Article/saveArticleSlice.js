import { createSlice } from "@reduxjs/toolkit"

const saveArticleSlice = createSlice({
  name: "article",
  initialState: [],
  reducers: {
    addArticle: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
    },
    deletArticle: {
      reducer: (state, action) => {
        let filterList = state.filter((el) => el._id !== action.payload)
        state = filterList
      },
    },
  },
})

export const { addArticle, deletArticle } = saveArticleSlice.actions

export const savedArticleList = (state) => state.article

export default saveArticleSlice.reducer
