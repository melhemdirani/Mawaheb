import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} from '../errors/index.js'
import { prisma } from '../db/connect.js'
import path from 'path'
const createFreelancerProfile = async (req, res) => {
  const {
    emiratesId,
    expirationDate,
    emiratesIdFrontSide,
    emiratesIdBackSide,
  } = req.body
  if (
    !emiratesId ||
    !expirationDate ||
    !emiratesIdFrontSide ||
    !emiratesIdBackSide
  ) {
    throw new BadRequestError('Please fill all the fields')
  }
  try {
    const freelancer = await prisma.freelancer.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.user.userId.id,
          },
        },
        languages: {
          create: req.body.languages ? req.body.languages : [],
        },
        bankDetails: {
          create: req.body.bankDetails ? req.body.bankDetails : undefined,
        },
        roles: {
          create: req.body.roles ? req.body.roles : [],
        },
      },
    })
    res.status(StatusCodes.OK).json({ freelancer })
  } catch (error) {
    console.log(error)
    throw new BadRequestError(error.message)
  }
}
const getAllFreelancers = async (req, res) => {
  const freelancers = await prisma.freelancer.findMany({
    include: {
      user: true,
      languages: true,
      roles: true,
      bankDetails: true,
    },
  })
  res.status(StatusCodes.OK).json({ freelancers })
}
const getFreelancerById = async (req, res) => {
  const freelancer = await prisma.freelancer.findUnique({
    where: { id: req.params.id },
    include: {
      user: true,
      languages: true,
      roles: true,
    },
  })
  if (!freelancer) {
    throw new NotFoundError('Freelancer not found')
  }
  res.status(StatusCodes.OK).json({ freelancer })
}

const updateFreelancer = async (req, res) => {
  const updateObject = {}
  if (req.body.languages) {
    updateObject.languages = {
      upsert: req.body.languages.map((language) => {
        return {
          where: { id: language.id ? language.id : req.params.id },
          update: language,
          create: language,
        }
      }),
    }
  }
  if (req.body.roles) {
    updateObject.roles = {
      upsert: req.body.roles.map((role) => {
        return {
          where: { id: role.id ? role.id : req.params.id },
          update: role,
          create: role,
        }
      }),
    }
  }
  if (req.body.bankDetails) {
    //upsert bank details object to update or create
    updateObject.bankDetails = {
      upsert: {
        create: req.body.bankDetails,
        update: req.body.bankDetails,
      },
    }
  }
  try {
    const freelancer = await prisma.freelancer.update({
      where: { id: req.params.id },
      data: {
        ...req.body.profile,
        ...updateObject,
      },
      include: {
        languages: true,
        roles: true,
        bankDetails: true,
      },
    })

    if (!freelancer) {
      throw new NotFoundError('Freelancer not found')
    }

    res.status(StatusCodes.OK).json({ freelancer })
  } catch (error) {
    console.log(error)
    throw new BadRequestError(error.message)
  }
}
const createLanguages = async (req, res) => {
  console.log(req.body.languages)
  const languageItem = req.body.languages.map((language) => {
    return { ...language, freelancer: { connect: { id: req.params.id } } }
  })

  try {
    const languages = await prisma.language.create({
      data: languageItem,
    })
    res.status(StatusCodes.OK).json({ languages })
  } catch (error) {
    console.log(error)
    throw new BadRequestError(error.message)
  }
}

const updateLanguage = async (req, res) => {
  const language = await prisma.language.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
    },
  })
  if (!language) {
    throw new NotFoundError('Language not found')
  }

  res.status(StatusCodes.OK).json({ language })
}
const deleteLanguage = async (req, res) => {
  const language = await prisma.language.delete({
    where: { id: req.params.id },
  })
  if (!language) {
    throw new NotFoundError('Language not found')
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! language Removed' })
}
const updateRole = async (req, res) => {
  const role = await prisma.experience.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
    },
  })
  if (!role) {
    throw new NotFoundError('Role not found')
  }
  res.status(StatusCodes.OK).json({ role })
}

const deleteRole = async (req, res) => {
  const role = await prisma.experience.delete({
    where: { id: req.params.id },
  })
  if (!role) {
    throw new NotFoundError('Role not found')
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Role Removed' })
}
const updateBankDetails = async (req, res) => {
  const bankDetails = await prisma.bankDetails.update({
    where: { id: req.params.id },
    data: {
      ...req.body,
    },
  })

  if (!bankDetails) {
    throw new NotFoundError('Bank Details not found')
  }
  res.status(StatusCodes.OK).json({ bankDetails })
}
const deleteBankDetails = async (req, res) => {
  const bankDetails = await prisma.bankDetails.delete({
    where: { id: req.params.id },
  })
  if (!bankDetails) {
    throw new NotFoundError('Bank Details not found')
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Details Removed' })
}
const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError('No file uploaded')
  }

  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('please upload image')
  }

  const imagePath = path.join('./public/uploads/' + `${productImage.name}`)
  await productImage.mv(imagePath)
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

export {
  createFreelancerProfile,
  getAllFreelancers,
  getFreelancerById,
  updateFreelancer,
  updateLanguage,
  deleteLanguage,
  updateRole,
  deleteRole,
  updateBankDetails,
  deleteBankDetails,
  uploadImage,

}
