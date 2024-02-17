import { createApi } from '@reduxjs/toolkit/query/react'
import { IBlog } from './types'
import customFetchBase from './customFetch'
import { addBlog, setBlogs } from '../redux/slice/blog.slice'
import { getLocalStorageItem } from '../utils/localStorage'
import { AccessToken } from '../constants'

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: customFetchBase,
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    createBlog: builder.mutation<
      IBlog,
      {
        content: string
        title: string
      }
    >({
      query(blog) {
        return {
          url: '/blogs',
          method: 'POST',
          credentials: 'include',
          body: blog,
          headers: {
            Authorization: `Bearer ${getLocalStorageItem(AccessToken)}`,
          },
        }
      },
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }],
      transformResponse: (result: { blog: IBlog; status: string }) =>
        result.blog,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(addBlog(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    getBlog: builder.query<IBlog, string>({
      query(id: string) {
        return {
          url: `/blogs/${id}`,
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${getLocalStorageItem(AccessToken)}`,
          },
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Blogs', id }],
      transformResponse: (result: { blog: IBlog; status: string }) =>
        result.blog,
    }),
    getAllBlogs: builder.query<IBlog[], null>({
      query() {
        return {
          url: `/blogs`,
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${getLocalStorageItem(AccessToken)}`,
          },
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Blogs' as const,
                id,
              })),
              { type: 'Blogs', id: 'LIST' },
            ]
          : [{ type: 'Blogs', id: 'LIST' }],
      transformResponse: (result: { blogs: IBlog[]; status: string }) =>
        result.blogs,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setBlogs(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogQuery,
  useLazyGetAllBlogsQuery,
  useLazyGetBlogQuery,
} = blogsApi
