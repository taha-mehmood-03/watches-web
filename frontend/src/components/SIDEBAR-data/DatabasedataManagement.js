// src/SIDEBAR-data/DatabasedataManagement.js

import { createSlice } from '@reduxjs/toolkit';
import api from '../API/Api';

const initialState = {
  currentData: [],
};

const dataSlice = createSlice({
  name: 'Databasedata',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.currentData = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;


//{{}}{}}{}{}{}{}{}{}{}{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
//we will use pagination when we will be fetching more products than 13
export const getDatabase = () => async (dispatch) => {
  try {
    const response = await api.get('/watches/Ordering');
    dispatch(setData(response.data));
  } catch (error) {
    console.error('Axios Error:', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
  }
};
//[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]{}{}{}{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}