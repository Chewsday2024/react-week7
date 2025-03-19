import { createSlice } from '@reduxjs/toolkit';
 
 
 
const initialState = { 
  toastMessages:[]
 
};
 
 
 
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    pushMessages (state, action) {
      const { success, message } = action.payload;
      const id = Date.now();

      state.toastMessages.push({
        id,
        success,
        message
      })
    },
    removeMessage (state, action) {
      const messageId = action.payload;
      const index = state.toastMessages.findIndex( message => message.id === messageId)

      if (index !== -1) {
        state.toastMessages.splice(index, 1);
      }
    }
  },
});



export const getToastMessages = state => state.toast.toastMessages;


export const { pushMessages, removeMessage } = toastSlice.actions;


export default toastSlice.reducer;