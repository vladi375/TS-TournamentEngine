import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from '../services/accountService';
import Role from './../enums/role';
import { RootState } from './store';

const initialState: UserState = {};

export const logUserOut = createAsyncThunk("user/logout", async () => {
  await logout();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            return {...action.payload};
        }
    },
    extraReducers: builder => {
      builder.addCase(logUserOut.fulfilled, (state, action) => {
        return initialState;
      })
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { userLoggedIn } = userSlice.actions

export const selectUserLogged = (state: RootState): boolean => 
  !!state.user.playerId;

export const selectUserName = (state: RootState): string | undefined =>
  state.user.name;

// Export the slice reducer as the default export
export default userSlice.reducer

export interface UserState {
    playerId?: number;
    name?: string;
    role?: Role
}