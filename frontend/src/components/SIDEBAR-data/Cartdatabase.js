import { createSlice } from "@reduxjs/toolkit";
import api from "../API/Api";
import { setUserId } from "./UserId";
const initialState = {
  currentCartData: [],
};

const cartdataSlice = createSlice({
  name: "CartDatabasedata",
  initialState,
  reducers: {
    setCartdata: (state, action) => {
      state.currentCartData = action.payload;
    },
  },
});

export const { setCartdata } = cartdataSlice.actions;
export default cartdataSlice.reducer;
export const getCartdata = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No user ID found in localStorage");
      return;
    } // Get userId from Redux state
    dispatch(setUserId(userId)); // Optionally set userId in Redux state if necessary
    const response = await api.get("/cart/carting", { params: { userId } }); // Pass userId as query parameter
    dispatch(setCartdata(response.data));
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Axios Error:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
    } else if (error.request) {
      console.error("Request:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
  }
};
