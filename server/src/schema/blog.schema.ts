import { object, string, TypeOf } from 'zod'

export const createBlogSchema = object({
  body: object({
    content: string({
      required_error: 'Content is required',
    }),
    title: string({
      required_error: 'Title is required',
    }),
  }),
})

const blogParams = {
  params: object({
    blogId: string(),
  }),
}

export const getBlogSchema = object({
  ...blogParams,
})

export type CreateBlogInput = TypeOf<typeof createBlogSchema>['body']
export type GetBlogInput = TypeOf<typeof getBlogSchema>['params']
