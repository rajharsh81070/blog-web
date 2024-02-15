import { NextFunction, Request, Response } from 'express'
import { CreateBlogInput, GetBlogInput } from '../schema/blog.schema'
import AppError from '../utils/appError'
import {
  createBlog,
  findAllBlogs,
  findBlogById,
} from '../services/blog.service'
import { Blog } from '../models/blog.model'

export const createBlogHandler = async (
  req: Request<{}, {}, CreateBlogInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = res.locals.user.id

    const blog = await createBlog({ input: req.body, user_id })

    res.status(201).json({
      status: 'success',
      data: {
        blog,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getBlogHandler = async (
  req: Request<GetBlogInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await findBlogById(req.params.blogId)

    if (!blog) {
      return next(new AppError('Blog with that ID not found', 404))
    }

    res.status(200).json({
      status: 'success',
      blog: {
        title: blog.title,
        content: blog.content,
        author_name: blog.user.name,
        created_at: blog.createdAt,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getBlogsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await findAllBlogs()

    res.status(200).json({
      status: 'success',
      blogs: blogs.map((blog) => ({
        title: blog.title,
        content: blog.content,
        author_name: blog.user.name,
        created_at: blog.createdAt,
      })),
    })
  } catch (err: any) {
    next(err)
  }
}
