import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import Role from './../enums/role';

const initialState: UserState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            return {...action.payload};
        }
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