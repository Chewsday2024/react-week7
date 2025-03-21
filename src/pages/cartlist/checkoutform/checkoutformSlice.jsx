import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { pushMessages } from '../../../components/toast/toastSlice';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
const initialState = { 
  status: 'idle',
  error: null,
};
 
 
 
const checkoutformSlice = createSlice({
  name: 'checkoutform',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(checkoutCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkoutCart.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const checkoutCart = createAsyncThunk('checkoutform/checkoutCart', async ( formInputValue, { dispatch }) => {
  try {
    const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, {
      data: {
        user: {...formInputValue},
        message: formInputValue.message
      }
    });

    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});



export const getCheckOutFormStatus = state => state.checkoutform.status;



export default checkoutformSlice.reducer;