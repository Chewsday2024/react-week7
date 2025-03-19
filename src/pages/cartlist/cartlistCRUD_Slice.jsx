import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



import { pushMessages } from '../../components/toast/toastSlice';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
const initialState = {
  status: 'idle',
  error: null
}
 
 
 
const cartlistCRUD_Slice = createSlice({
  name: 'cartlistCRUD',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(addCart.pending, (state, action) => {
        state.status = action.meta.arg.id;
      })
      .addCase(addCart.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = 'failed';
        
        state.error = action.error.message;
      })



      .addCase(editCartItem.pending, state => {
        state.status = 'loading';
      })
      .addCase(editCartItem.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(delCartItem.pending, state => {
        state.status = 'loading';
      })
      .addCase(delCartItem.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(delCartItem.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(clearCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(clearCart.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});




export const addCart = createAsyncThunk('CRUD/addCart', async ({ id, qty }, { dispatch }) => {
  try {
    const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
      data: {
        product_id: id,
        qty: Number(qty)
      }
    });
    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});




export const editCartItem = createAsyncThunk('CRUD/editCartItem', async ({ itemId, productId, itemQty }, { dispatch }) => {
  try {
    const res = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${itemId}`, {
      data: {
        product_id: productId,
        qty: Number(itemQty)
      }
    });

    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});




export const delCartItem = createAsyncThunk('CRUD/delCartItem', async (itemId, { dispatch }) => {
  try {
    const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${itemId}`);

    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});




export const clearCart = createAsyncThunk('CRUD/clearCart', async ( _, { dispatch }) => {
  try {
    const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);

    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});



export const getCartListCRUD_Status = state => state.cartlistCRUD.status;



export default cartlistCRUD_Slice.reducer;