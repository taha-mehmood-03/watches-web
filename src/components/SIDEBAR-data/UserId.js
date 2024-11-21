import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  UserId: null, // Default image
};

const imageSlice = createSlice({
  name: 'user_id',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.UserId = action.payload;
    },
    clearUserId: (state, action) => {
      state.UserId = null;
    },
  },
});

export const { setUserId , clearUserId } = imageSlice.actions;
export default imageSlice.reducer;
