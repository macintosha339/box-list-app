import { configureStore } from '@reduxjs/toolkit';
import boxReducer from './slices/boxSlice'

export const store = configureStore({
  reducer: {
    boxes: boxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;