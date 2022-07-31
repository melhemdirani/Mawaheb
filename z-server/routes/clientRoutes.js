import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import authorizePermissions from '../middleware/authPermissions.js'

import { createClientProfile } from '../controllers/clientController.js'

router
  .route('/')
  .post([authenticateUser, authorizePermissions('client')], createClientProfile)

export default router
