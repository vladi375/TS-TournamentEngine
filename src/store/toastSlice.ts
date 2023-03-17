import { createSlice } from '@reduxjs/toolkit';
import { UseToastOptions } from '@chakra-ui/react';

import { RootState } from './store';

export interface ToastState {
  toast: UseToastOptions;
}

const initialState: ToastState = {
  toast: {
    isClosable: true,
    duration: 5000,
  },
};

const toastSlice = createSlice({
  name: 'toastData',
  initialState,
  reducers: {
    displayToast(state, action) {
      state.toast.title = action.payload.title;
      state.toast.description = action.payload.description;
      state.toast.status = action.payload.status;
    },
  },
});

export const { displayToast } = toastSlice.actions;

export const selectToast = (state: RootState): UseToastOptions =>
  state.toastData.toast;

export default toastSlice.reducer;
