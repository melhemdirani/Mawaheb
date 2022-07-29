import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { prisma } from '../db/connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const testRegister = async (req, res) => {
  const { name, email, password } = req.body

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  res.status(StatusCodes.CREATED).json({ user })
}

const register = async (req, res) => {
  const { name, email, password, phoneNb, role } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values')
  }
  
  //check  through prisma if email already exists
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }
  const salt = await bcrypt.genSalt(10)
  //create jwt token

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, salt),
      phoneNb,
      role,
    },
  })
  //find id of this user
  const userId = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  const token = jwt.sign(
    {
      name: user.name,
      role: user.role,
     userId : userId
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )

  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      phoneNb: user.phoneNb,
    },
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: false,
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
    },
  })
  if (!user) {
    throw new UnAuthenticatedError(` user with email ${email} not found`)
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('wrong password')
  }
  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,

      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
  user.password = undefined
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      email: user.email,
      phoneNb: user.phoneNb,
      role: user.role,
    },
  })
}
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out !' })
}

export { register, login, logout, testRegister }
