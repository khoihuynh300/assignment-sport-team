import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'success',
  isShow: false,
};
export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    notify: (state, action) => {
      const { message, type = 'success' } = action.payload;
      state.message = message;
      state.type = type;
      state.isShow = true;
    },
    turnOffNotify: (state) => {
      state.isShow = false;
    },
  },
});

export const { notify, turnOffNotify } = toastSlice.actions;

export default toastSlice.reducer;
