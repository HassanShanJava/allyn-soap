import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Menu {
  menu: any | null;
}
// Define a type for the slice state
interface MenuState {
  menu: any | null;
}

// Define the initial state using that type
const initialState: MenuState = {
  menu: null,
};

export const menuSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    naveList: (state, action: PayloadAction<Menu>) => {
      state.menu = action.payload;
    },
  },
});

export const { naveList } = menuSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.layout;

export default menuSlice.reducer;
