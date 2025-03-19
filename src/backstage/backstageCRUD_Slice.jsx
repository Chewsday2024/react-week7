import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


import { pushMessages } from '../components/toast/toastSlice';
import { getBackStageProducts } from './backstageSlice';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
const initialState = { 
  status: 'idle',
  error: null
};
 
 
 
const backstageCRUD_Slice = createSlice({
  name: 'backstageCRUD',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(createProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(editProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(editProduct.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })




      .addCase(delProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(delProduct.fulfilled, state => {
        state.status = 'succeed';
      })
      .addCase(delProduct.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});




export const createProduct = createAsyncThunk('backstageCRUD/createProduct', async ( _, thunkAPI ) => {
  const state = thunkAPI.getState().modal;

  const { dispatch } = thunkAPI;

  try {
    const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`, {
      data: {
        ...state.defaultValue,
        origin_price: Number(state.defaultValue.origin_price),
        price: Number(state.defaultValue.price),
        is_enabled: state.defaultValue.is_enabled ? 1 : 0
      }
    });

    dispatch(getBackStageProducts());

    dispatch(pushMessages(res.data));
  } catch (err) {
    const { message } = err.response.data;
    dispatch(pushMessages({...err.response.data, message: message.join('、')}));
  }
});




export const editProduct = createAsyncThunk('backstageCRUD/editProduct', async ( _, thunkAPI ) => {
  const state = thunkAPI.getState().modal;

  const { dispatch } = thunkAPI;

  try {
    const res = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${state.defaultValue.id}`, {
      data: {
        ...state.defaultValue,
        origin_price: Number(state.defaultValue.origin_price),
        price: Number(state.defaultValue.price),
        is_enabled: state.defaultValue.is_enabled ? 1 : 0
      }
    });
  
    dispatch(getBackStageProducts());

    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});





export const delProduct = createAsyncThunk ('backend/delProduct', async (_, thunkAPI ) => {
  const state = thunkAPI.getState().modal;

  const { dispatch } = thunkAPI;

  try {
    const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${state.defaultValue.id}`);

    dispatch(getBackStageProducts());

    dispatch(pushMessages(res.data));
  } catch (err) {
    dispatch(pushMessages(err.response.data));
  }
});


export const getBackStageCRUD_Status = state => state.backstageCRUD.status;



export default backstageCRUD_Slice.reducer;