import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './reducers/category';
import filtersReducer from './reducers/filters';
import layoutReducer from './reducers/layout';
import cartReducer from './reducers/cart';
import authReducer from './reducers/auth';
import menuReducer from './reducers/menu';

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    category: categoryReducer,
    filters: filtersReducer,
    cart: cartReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
