
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ErrorState {
    notFound: boolean
}

const initialState: ErrorState = {
    notFound: false
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showNotFoundError(state, action) {
            state.notFound = action.payload;
        }
    }
})

export const { showNotFoundError } = errorSlice.actions;

export const selectShowNotFoundPage = (state: RootState): boolean => state.error.notFound;

export default errorSlice.reducer