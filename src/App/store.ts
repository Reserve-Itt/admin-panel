import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import { authApi } from "../services/authApi";
import emailSlice from "../features/emailSlice";
import forgotPassworddSlice from "../features/forgotPassworddSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    email: emailSlice,
    forgotPassword: forgotPassworddSlice,
    [authApi.reducerPath]: authApi.reducer,
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch)