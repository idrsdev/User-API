import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'

import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
import config from './config/index.js' //loads config based on our NODE_ENV
const { PORT, MONGO_URI } = config

// for testing create in-memory database and connect to it!
process.env.NODE_ENV !== 'test' ? connectDB(MONGO_URI) : ''

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(
    PORT,
    console.log(
        `Server running on ${PORT} in ${process.env.NODE_ENV}`.yellow.bold
    )
)

export default app
