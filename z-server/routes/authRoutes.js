import express from 'express'
const router = express.Router()
import { register, login,logout,testRegister  } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/testRegister').post(testRegister)



export default router
