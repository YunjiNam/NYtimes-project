import { createSlice } from "@reduxjs/toolkit"

const saveKeywordSlice = createSlice({
  name: "keywordList",
  initialState: [],
  reducers: {
    addKeyword: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
    },
    delKeyword: {
      reducer: (state, action) => {
        state.splice(
          state.findIndex((el) => el == action.payload),
          1
        )
      },
    },
  },
})

export const { addKeyword, delKeyword } = saveKeywordSlice.actions

export const saveKeywordList = (state) => state.keyword

export default saveKeywordSlice.reducer
