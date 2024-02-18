import AppError from '../../src/utils/appError'

describe('AppError', () => {
  it('creates an instance with default status code', () => {
    const errorMessage = 'Test error message'
    const error = new AppError(errorMessage)

    expect(error.message).toBe(errorMessage)
    expect(error.statusCode).toBe(500)
    expect(error.status).toBe('error')
  })

  it('creates an instance with custom status code', () => {
    const errorMessage = 'Test error message'
    const statusCode = 404
    const error = new AppError(errorMessage, statusCode)

    expect(error.message).toBe(errorMessage)
    expect(error.statusCode).toBe(statusCode)
    expect(error.status).toBe('fail')
  })

  it('creates an instance with status code from string', () => {
    const errorMessage = 'Test error message'
    const statusCode = '404'
    const error = new AppError(errorMessage, Number(statusCode))

    expect(error.message).toBe(errorMessage)
    expect(error.statusCode).toBe(404)
    expect(error.status).toBe('fail')
  })

  it('captures stack trace', () => {
    const errorMessage = 'Test error message'
    const error = new AppError(errorMessage)

    expect(error.stack).toBeDefined()
  })
})
