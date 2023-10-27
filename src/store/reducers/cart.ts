import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Cart {
  cart_id: string | null;
  cart: any | null;
}
// Define a type for the slice state
interface CategoryState {
  cart: Cart;
  isCartOpen: boolean;
}

// Define the initial state using that type
const initialState: CategoryState = {
  cart: {
    cart_id: null,
    cart: null,
  },
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<Cart>) => {
      console.log('action.payload', action.payload);
      state.cart = action.payload;
    },
    toggleCartModal: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { toggleCart, toggleCartModal } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.layout;

export default cartSlice.reducer;
