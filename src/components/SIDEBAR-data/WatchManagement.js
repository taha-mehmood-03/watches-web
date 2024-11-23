import { createSlice } from '@reduxjs/toolkit';
import api from '../API/Api';

const initialState = {
  currentWatch: null,
  quantity: 1,
};

const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    setWatch: (state, action) => {
      state.currentWatch = action.payload;
      state.quantity = action.payload.quantity;
    },
  },
});

export const { setWatch } = watchSlice.actions;
export default watchSlice.reducer;

export const Selectedwatch = (watch, navigate,quantity) => async (dispatch) => {
  try {
    const userId = localStorage.getItem("userId");
     // Extract quantity from watch object
    const response = await api.post("/cart/addcart", { ...watch, userId,  quantity });
    console.log("Added to cart:", response.data);
    navigate("../cart");
  } catch (error) {
    console.log("Error adding to cart:", error);
  }
};
