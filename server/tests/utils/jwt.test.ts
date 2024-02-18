import jwt from 'jsonwebtoken'
import { signJwt, verifyJwt } from '../../src/utils/jwt'

jest.mock('dotenv', () => ({
  config: jest.fn(),
}))
process.env.JWT_SECRET = 'testSecret'

describe('JWT Utils', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('signJwt', () => {
    it('should sign JWT token', () => {
      const payload = { userId: '123' }
      const token = signJwt(payload)

      const decoded = jwt.verify(token, process?.env?.JWT_SECRET || '')
      expect(decoded).toMatchObject(payload)
    })

    it('should sign JWT token with provided options', () => {
      const payload = { userId: '123' }
      const options = { expiresIn: '1h' }
      const token = signJwt(payload, options)

      const decoded = jwt.verify(token, process?.env?.JWT_SECRET || '')
      expect(decoded).toMatchObject(payload)
    })
  })

  describe('verifyJwt', () => {
    it('should verify JWT token and return payload', () => {
      const payload = { userId: '123' }
      const token = jwt.sign(payload, process?.env?.JWT_SECRET || '')
      const decoded = verifyJwt<{ userId: string }>(token)

      expect(decoded).toMatchObject(payload)
    })

    it('should return null for invalid token', () => {
      const token = 'invalid_token'
      const decoded = verifyJwt<{ userId: string }>(token)

      expect(decoded).toBeNull()
    })

    it('should return null for expired token', () => {
      const payload = { userId: '123' }
      const token = jwt.sign(payload, process?.env?.JWT_SECRET || '', {
        expiresIn: '-1s',
      })
      const decoded = verifyJwt<{ userId: string }>(token)

      expect(decoded).toBeNull()
    })
  })
})
