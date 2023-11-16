import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { defaultSort } from '~/utils/constant';

type priceType = {
  min: number;
  max: number;
};
export interface Filters {
  sortKey: string;
  reverse: boolean;
  first: number | null;
  last: number | null;
  after: string | null;
  before: string | null;
  price: priceType | null;
}
// Define a type for the slice state
interface FiltersState {
  filters: Filters;
}

// Define the initial state using that type
const initialState: FiltersState = {
  filters: {
    sortKey: defaultSort?.sortKey,
    reverse: defaultSort?.reverse,
    first: 20,
    last: null,
    after: null,
    before: null,
    price: null,
  },
};

export const filtersSlice = createSlice({
  name: 'filters',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
  },
});

export const { toggleFilters } = filtersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.layout;

export default filtersSlice.reducer;
