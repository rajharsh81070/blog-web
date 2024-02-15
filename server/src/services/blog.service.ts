import blogModel, { Blog } from '../models/blog.model'

export const createBlog = async ({
  input,
  user_id,
}: {
  input: Partial<Blog>
  user_id: string
}) => {
  return blogModel.create({ ...input, user: user_id })
}

export const findBlogById = async (id: string) =>
  await blogModel
    .findById(id)
    .populate('user')
    .lean()
    .exec()
    .then((blog) => JSON.parse(JSON.stringify(blog)))

export const findAllBlogs = async () => {
  const blogs = (await blogModel.find().populate('user').lean().exec()).map(
    (blog) => JSON.parse(JSON.stringify(blog))
  )

  console.log('blogs--->', blogs)

  return blogs
}
