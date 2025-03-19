import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BASE_URL;
 
 
 
const initialState = { 
  status: 'idle',
  isLogin: false,
  error: null
};

 
 
 
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginStatus (state) {
      state.status = 'idle';
    }
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(asyncUserLogin.pending, state => {
        state.status = 'loading';
      })
      .addCase(asyncUserLogin.fulfilled, (state, action) => {
        state.status = 'login succeed';

        state.isLogin = true;

        const { token, expired } = action.payload;

        document.cookie = `dogfood=${token}; expires=${new Date(expired)}`;

        
      })
      .addCase(asyncUserLogin.rejected, (state, action) => {
        state.status = 'login failed';
        state.error = action.error.message;
      })



      .addCase(asyncUserLogout.pending, state => {
        state.status = 'loading';
      })
      .addCase(asyncUserLogout.fulfilled, state => {
        state.status = 'logout succeed';

        state.isLogin = false;
      })
      .addCase(asyncUserLogout.rejected, (state, action) => {
        state.status = 'logout failed';

        state.error = action.error.message;
      })



      // .addCase(asyncCheckIsUserLogin.pending, state => {
      //   state.status = 'loading';
      // })
      // .addCase(asyncCheckIsUserLogin.fulfilled, state => {
      //   state.status = 'succeed';
      // })
      // .addCase(asyncCheckIsUserLogin.rejected, (state, action) => {
      //   state.status = 'failed';

      //   state.error = action.error.message;
      // })
  }
});




export const asyncUserLogin = createAsyncThunk('login/asyncUserLogin', async (accountData) => {
  const res = await axios.post(`${BASE_URL}/v2/admin/signin`, accountData);

  return res.data
});



export const asyncUserLogout = createAsyncThunk('login/asyncUserLogout', async () => {
  await axios.post(`${BASE_URL}/v2/logout`);
});



// export const asyncCheckIsUserLogin = createAsyncThunk('login/asyncCheckIsUserLogin', async (_, { rejectWithValue }) => {
//   try {
//     await axios.post(`${BASE_URL}/v2/api/user/check`);
//   } catch (err) {
    
//     return rejectWithValue(err.response.data);
//   }
// });







export const getLoginStatus = state => state.login.status;

export const getIsLoginStatus = state => state.login.isLogin;

export const getLoginError = state => state.login.error;


export const { resetLoginStatus } = loginSlice.actions;





export default loginSlice.reducer;