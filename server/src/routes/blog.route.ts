import express from 'express'
import {
  createBlogHandler,
  getBlogHandler,
  getBlogsHandler,
} from '../controllers/blog.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { createBlogSchema, getBlogSchema } from '../schema/blog.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)
router
  .route('')
  .post(validate(createBlogSchema), createBlogHandler)
  .get(getBlogsHandler)

router.route('/:blogId').get(validate(getBlogSchema), getBlogHandler)

export default router
