import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

 
 
 
const initialState = { 
  product: {},
  status: 'idle',
  error: null,
};
 
 
 
const productdetailSlice = createSlice({
  name: 'productdetail',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(getOneProductDetail.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOneProductDetail.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.product = {...action.payload};
      })
      .addCase(getOneProductDetail.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});





export const getOneProductDetail = createAsyncThunk('productdetail/getOneProductDetail', async (id) => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);

  return res.data.product;
})





export const getProductDetail = state => state.productdetail.product;

export const getProductDetailStatus = state => state.productdetail.status;




export default productdetailSlice.reducer;