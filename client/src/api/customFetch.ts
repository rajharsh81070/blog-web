import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

const backendUrl = process.env?.BACKEND_URL ?? 'http://localhost:2000'
const baseUrl = `${backendUrl}/api/`

const baseQuery = fetchBaseQuery({
  baseUrl,
})

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}

export default customFetchBase
