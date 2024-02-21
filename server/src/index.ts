require('dotenv').config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoDB from './server/mongoDB'
import authRouter from './routes/auth.route'
import blogRouter from './routes/blog.route'
import path from 'path'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

const frontendUrl = process.env?.FRONTEND_URL ?? 'http://localhost:3000'

app.use(
  cors({
    credentials: true,
    origin: [frontendUrl],
  })
)

app.get('/api/healthcheck', (req: any, res: any, next: any) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
  })
})

app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)

// Unknown Routes
app.all('/api/*', (req: any, res: any, next: any) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
})

// Global Error Handler
app.use((err: any, req: any, res: any, _next: any) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../../client/build')))

  app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  mongoDB()
})
