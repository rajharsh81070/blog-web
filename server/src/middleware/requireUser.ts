import AppError from '../utils/appError'

export const requireUser = (req: any, res: any, next: any) => {
  try {
    const user = res.locals.user
    if (!user) {
      return next(new AppError(`Invalid token or session has expired`, 401))
    }

    next()
  } catch (err: any) {
    next(err)
  }
}
