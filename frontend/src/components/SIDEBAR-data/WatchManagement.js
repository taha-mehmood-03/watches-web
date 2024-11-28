import { createSlice } from '@reduxjs/toolkit';
import api from '../API/Api';

const initialState = {
  currentWatch: null,
  quantity: 1,
  error: null,
};

const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    setWatch: (state, action) => {
      state.currentWatch = action.payload;
      state.quantity = action.payload.quantity;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setWatch, setError, clearError } = watchSlice.actions;
export default watchSlice.reducer;

export const Selectedwatch = (watch, navigate, quantity) => async (dispatch) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.post("/cart/addcart", { ...watch, userId, quantity });
    console.log("Added to cart:", response.data);
    dispatch(clearError());
    navigate("../cart");
  } catch (error) {
    console.log("Error adding to cart:", error);
    dispatch(setError(error.response.data.error));
  }
};