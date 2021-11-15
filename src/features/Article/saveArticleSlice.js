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
        state.splice(
          state.findIndex((el) => el.list[0]._id == action.payload),
          1
        )
      },
    },
  },
})

export const { addArticle, deletArticle } = saveArticleSlice.actions

export const savedArticleList = (state) => state.article

export default saveArticleSlice.reducer
