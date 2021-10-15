import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
  name: "search",

  initialState: [],

  reducers: {
    addValue: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
    },
  },
})

export const { addValue } = searchSlice.actions

export default searchSlice.reducer
