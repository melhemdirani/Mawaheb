import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import authorizePermissions from '../middleware/authPermissions.js'
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getAllClients,
  getAllFreelancers,
} from '../controllers/userController.js'

router.route('/showMe').get(authorizePermissions('admin'), showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)
router.route('/clients').get(authorizePermissions('admin'), getAllClients)
router
  .route('/freelancers')
  .get(authorizePermissions('admin'), getAllFreelancers)
router.route('/:id').get(getSingleUser)

export default router
