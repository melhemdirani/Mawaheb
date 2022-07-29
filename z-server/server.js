import express from 'express'

const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import helmet from 'helmet'
import xss from 'xss-clean'
import MongoSanitize from 'express-mongo-sanitize'

//db and authenticateUser


//routers
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'
import authorizePermissions from './middleware/authPermissions.js'
if (process.env.NODE_ENV !== 'production') [app.use(morgan('dev'))]
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./Public'))

app.use(fileUpload())

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Welcome!' })
})
//Routes
app.use('/api/v1/auth', authRouter)
app.use(
  '/api/v1/users',
  authenticateUser,

  userRouter
)
//Routes

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
