import { createSlice } from "@reduxjs/toolkit";

const itenSlice = createSlice({
  name: "itenerary",
  initialState: {
    data: null,
  },
  reducers: {
    setIten: (state, action) => {
      state.data = action.payload;
    },
    clearIten: (state) => {
      state.data = null;
    },
  },
});

export const { setIten, clearIten } = itenSlice.actions;
export default itenSlice.reducer;
