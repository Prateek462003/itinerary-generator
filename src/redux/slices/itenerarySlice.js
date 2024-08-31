import { createSlice } from "@reduxjs/toolkit";

const itenSlice = createSlice({
  name: "itenerary",
  initialState: {
    data: null,
  },
  reducers: {
    setIten: (state, action) => {
      state.data = action.payload;
      console.log("payload", action.payload);

      console.log("slice data", state.data);
    },
  },
});

export const { setIten } = itenSlice.actions;
export default itenSlice.reducer;
