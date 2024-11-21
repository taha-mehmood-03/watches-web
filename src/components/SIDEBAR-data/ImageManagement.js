import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentImage: null, // Default image
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.currentImage = action.payload;
    },
  },
});

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;


