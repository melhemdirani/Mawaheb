import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from '../errors/index.js'
import { prisma } from '../db/connect.js'
import path from 'path'

const createClientProfile = async (req, res) => {
  const client = await prisma.client.create({
    data: {
      ...req.body,
      user: {
        connect: { id: req.user.userId.id },
      },
    },
  })
  res.status(StatusCodes.OK).json({ client })
}

export { createClientProfile }
