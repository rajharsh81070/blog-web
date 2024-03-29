import { createApi } from '@reduxjs/toolkit/query/react'
import { GenericResponse, ILoginResponse } from './types'
import customFetchBase from './customFetch'
import { IRegisterInput } from '../routes/register/Register'
import { ILoginInput } from '../routes/login/Login'
import { setAccessToken } from '../redux/slice/user.slice'
import { setLocalStorageItem } from '../utils/localStorage'
import { AccessToken } from '../constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation<GenericResponse, IRegisterInput>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        }
      },
    }),
    loginUser: builder.mutation<ILoginResponse, ILoginInput>({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setLocalStorageItem(AccessToken, data.access_token)
          dispatch(setAccessToken(data.access_token))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: 'auth/logout',
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi
