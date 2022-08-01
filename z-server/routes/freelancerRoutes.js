import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import authorizePermissions from '../middleware/authPermissions.js'

import {
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
} from '../controllers/freelancerController.js'

router
  .route('/')
  .get(getAllFreelancers)
  .post(
    [authenticateUser, authorizePermissions('freelancer')],
    createFreelancerProfile
  )

router.route('/uploadImage').post(uploadImage)

router
  .route('/:id')
  .get(getFreelancerById)
  .patch(
    [authenticateUser, authorizePermissions('freelancer')],
    updateFreelancer
  )
router
  .route('/:id/language')
  .patch([authenticateUser, authorizePermissions('freelancer')], updateLanguage)
  .delete(
    [authenticateUser, authorizePermissions('freelancer')],
    deleteLanguage
  )
router
  .route('/:id/role')
  .patch([authenticateUser, authorizePermissions('freelancer')], updateRole)
  .delete([authenticateUser, authorizePermissions('freelancer')], deleteRole)
router
  .route('/:id/bankDetails')
  .patch(
    [authenticateUser, authorizePermissions('freelancer')],
    updateBankDetails
  )
  .delete(
    [authenticateUser, authorizePermissions('freelancer')],
    deleteBankDetails
  )

export default router
