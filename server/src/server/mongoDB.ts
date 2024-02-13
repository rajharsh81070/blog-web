import mongoose from 'mongoose'

const dbUrl = process.env.DB_CONNECT_URL || ''

const mongoDB = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('Database connected...')
  } catch (error: any) {
    console.log(error.message)
    setTimeout(mongoDB, 5000)
  }
}

export default mongoDB
