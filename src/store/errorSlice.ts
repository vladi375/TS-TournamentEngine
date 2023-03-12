
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import HttpStatusCode from './../enums/httpStatusCode';

interface ErrorState {
    errorCode: HttpStatusCode | null
}

const initialState: ErrorState = {
    errorCode: null 
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setErrorCode(state, action) {
            state.errorCode = action.payload;
        }
    }
})

export const { setErrorCode } = errorSlice.actions;

export const selectErrorCode = (state: RootState): HttpStatusCode | null => state.error.errorCode;

export default errorSlice.reducer