import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
const initialState = { 
  productlist: [],
  status: 'idle',
  error: null
};
 
 
 
const productlistSlice = createSlice({
  name: 'productlist',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(getAllProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.productlist = [...action.payload];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const getAllProducts = createAsyncThunk('productList/getAllProducts', async () => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);

  return res.data.products;
});



export const getProductlist = state => state.productlist.productlist;

export const getProductListStatus = state => state.productlist.status;



export default productlistSlice.reducer;