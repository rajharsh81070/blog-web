import { NextFunction, Request, Response } from 'express'
import { CreateBlogInput, GetBlogInput } from '../schema/blog.schema'
import AppError from '../utils/appError'
import {
  createBlog,
  findAllBlogs,
  findBlogById,
} from '../services/blog.service'
import { client, getAsync, setAsync } from '../server/redis'

export const createBlogHandler = async (
  req: Request<{}, {}, CreateBlogInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = res.locals.user.id

    const createdBlog = await createBlog({ input: req.body, user_id })

    const blog = await findBlogById(createdBlog.id)

    await client.del('blogs')

    res.status(201).json({
      status: 'success',
      blog: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        authorName: blog.user.name,
        createdAt: blog.createdAt,
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
    const blogId = req.params.blogId

    const cachedBlog = await getAsync(blogId)

    if (cachedBlog) {
      res.json(JSON.parse(cachedBlog))
    }

    const blog = await findBlogById(blogId)

    if (!blog) {
      return next(new AppError('Blog with that ID not found', 404))
    }

    const responseData = {
      status: 'success',
      blog: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        authorName: blog.user.name,
        createdAt: blog.createdAt,
      },
    }

    await setAsync(blogId, JSON.stringify(responseData))

    res.status(200).json(responseData)
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
    const cachedBlogs = await getAsync('blogs')

    if (cachedBlogs) {
      res.json(JSON.parse(cachedBlogs))
    }

    const blogs = await findAllBlogs()

    const responseData = {
      status: 'success',
      blogs: blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        authorName: blog.user.name,
        createdAt: blog.createdAt,
      })),
    }

    await setAsync('blogs', JSON.stringify(responseData))

    res.status(200).json(responseData)
  } catch (err: any) {
    next(err)
  }
}
