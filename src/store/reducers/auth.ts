import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Auth {
  token_id: string | null;
  user: any | null;
  is_login: boolean;
}
// Define a type for the slice state
interface AuthState {
  user: Auth;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {
    token_id: null,
    user: null,
    is_login: false,
  },
};

export const authSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleAuth: (state, action: PayloadAction<Auth>) => {
      state.user = action.payload;
    },
  },
});

export const { toggleAuth } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.layout;

export default authSlice.reducer;
