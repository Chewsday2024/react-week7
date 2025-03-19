import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

 
 
 
const initialState = { 
  backStageProducts: [],
  pageInfo: {},
  status: 'idle',
  error: null
};
 
 
const backstageSlice = createSlice({
  name: 'backstage',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(getBackStageProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getBackStageProducts.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.backStageProducts = [...action.payload.products];

        state.pageInfo = {...action.payload.pagination};
      })
      .addCase(getBackStageProducts.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const getBackStageProducts = createAsyncThunk('backstage/getBackStageProducts', async ( page = 1 ) => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`);

  return res.data;
});




export const getALLProducts = state => state.backstage.backStageProducts;

export const getBackStageProductsStatus = state => state.backstage.status;

export const getPageInfo = state => state.backstage.pageInfo;





export default backstageSlice.reducer;