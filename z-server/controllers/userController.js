import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from '../errors/index.js'
import { prisma } from '../db/connect.js'
import { json } from 'express'
import bcrypt from 'bcryptjs'

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
}
const getAllFreelancers = async (req, res) => {
  const freelancers = await prisma.user.findMany({
    where: {
      role: 'freelancer',
    },
    select: {
      password: false,
      name: true,
      email: true,
      phoneNb: true,
    },
  })
  res.status(StatusCodes.OK).json({ freelancers })
}
const getAllClients = async (req, res) => {
  const clients = await prisma.user.findMany({
    where: {
      role: 'client',
    },
    select: {
      password: false,
      name: true,
      email: true,
      phoneNb: true,
    },
  })
  res.status(StatusCodes.OK).json({ clients })
}
const getSingleUser = async (req, res) => {
  const { id } = req.params
  const userId = parseInt(id)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      password: false,
      name: true,
      email: true,
      phoneNb: true,
      role: true,
    },
  })
  if (!user) {
    throw new NotFoundError('User not found')
  }
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId }).select('-password')
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()
  const token = user.createJWT()
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })

  res.status(StatusCodes.OK).json({ user })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
    console.log(req.user)
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('please provide all values')
  }

const user= await prisma.user.findUnique({
  where: {
    id: parseInt(req.user.userId),
  }
})
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  user.password = newPassword
  const salt = await bcrypt.genSalt(10)

  await prisma.user.update({
    where: {
      id: parseInt(req.user.userId),
    },
    data: {
      password:  await bcrypt.hash(newPassword, salt), 

    },

  })
  res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' })
}
export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getAllFreelancers,
  getAllClients,
}
