import Redis from 'ioredis'
import { promisify } from 'util'

const client = new Redis({
  port: 6379,
  host: 'localhost',
  db: 0,
})

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
let isAvailable = true

client.on('error', (err) => {
  isAvailable = false
  console.error('Redis Client Error:', err)
})

export { client, getAsync, setAsync, isAvailable }
