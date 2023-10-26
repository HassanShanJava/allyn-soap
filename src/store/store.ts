import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './reducers/category';
import filtersReducer from './reducers/filters';
import layoutReducer from './reducers/layout';
import cartReducer from './reducers/cart';

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    category: categoryReducer,
    filters: filtersReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
