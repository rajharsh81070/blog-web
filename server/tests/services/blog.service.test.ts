import * as blogService from '../../src/services/blog.service'
import blogModel from '../../src/models/blog.model'

jest.mock('../../src/models/blog.model')

describe('Blog Service', () => {
  describe('createBlog', () => {
    it('creates a blog with the given input and user_id', async () => {
      const input = { title: 'Test Blog', content: 'Test Content' }
      const user_id = 'user123'

      const createMock = jest.fn().mockResolvedValue({})

      blogModel.create = createMock

      await blogService.createBlog({ input, user_id })

      expect(createMock).toHaveBeenCalledWith({ ...input, user: user_id })
    })
  })
})
