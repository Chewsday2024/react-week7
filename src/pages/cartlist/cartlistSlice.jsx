import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
const initialState = { 
  cartlist: [],
  originTotal: 0,
  discountTotal: 0,
  status: 'idle',
  error: null,
};
 
 
 
const cartlistSlice = createSlice({
  name: 'cartlist',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(getAllCartItems.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.status = 'succeed';

        action.payload && (state.cartlist = [...action.payload]);

        action.payload && (state.discountTotal = action.payload.reduce((total, cart) => total + cart.total, 0));

        action.payload && (state.originTotal = action.payload.reduce((total, cart) => total + (cart.product.origin_price * cart.qty), 0));
      })
      .addCase(getAllCartItems.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});




export const getAllCartItems = createAsyncThunk('cartlist/getAllCartItems', async () => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);

  return res.data.data.carts;
});




export const getCartList = state => state.cartlist.cartlist;

export const getCartListStatus = state => state.cartlist.status;

export const getOriginTotal = state => state.cartlist.originTotal;

export const getDiscountTotal = state => state.cartlist.discountTotal;





export default cartlistSlice.reducer;