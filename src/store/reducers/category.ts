import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Category {
  title: string;
  index: number;
  handle: string;
  category_id: string;
}
// Define a type for the slice state
interface CategoryState {
  category: Category;
}

// Define the initial state using that type
const initialState: CategoryState = {
  category: {
    title: 'Body',
    handle: 'body',
    index: 0,
    category_id: 'gid://shopify/Collection/463137538321',
  },
};

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      console.log('action.payload', action.payload);
      state.category = action.payload;
    },
  },
});

export const { toggleCategory } = categorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.layout;

export default categorySlice.reducer;
