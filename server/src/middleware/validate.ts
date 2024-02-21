import { AnyZodObject, ZodError } from 'zod'

export const validate =
  (schema: AnyZodObject) => (req: any, res: any, next: any) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      })

      next()
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          error: err.errors,
        })
      }
      next(err)
    }
  }
