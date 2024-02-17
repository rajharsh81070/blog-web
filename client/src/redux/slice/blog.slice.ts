import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBlog } from '../../api/types'

interface IBlogState {
  blogs: IBlog[]
}

const initialState: IBlogState = {
  blogs: [],
}

export const blogSlice = createSlice({
  initialState,
  name: 'blogSlice',
  reducers: {
    setBlogs: (state, action: PayloadAction<IBlog[]>) => {
      return {
        ...state,
        blogs: action.payload,
      }
    },
    addBlog: (state, action: PayloadAction<IBlog>) => {
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      }
    },
    updateBlog: (state, action: PayloadAction<IBlog>) => {
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      }
    },
  },
})

export default blogSlice.reducer

export const { setBlogs, addBlog, updateBlog } = blogSlice.actions
