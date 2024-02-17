import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import globalReducer from './slice/global.slice'
import { authApi } from '../api/auth.api'
import { blogsApi } from '../api/blogs.api'
import userReducer from './slice/user.slice'
import blogReducer from './slice/blog.slice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    userState: userReducer,
    blogState: blogReducer,
    globalState: globalReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, blogsApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
