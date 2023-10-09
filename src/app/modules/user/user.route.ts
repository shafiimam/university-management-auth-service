import express from 'express'
import { RequestValidation } from '../../../middleWares/validateRequest'
import { UserController } from './user.controller'
import UserValidation from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  RequestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

const UserRoutes = router

export default UserRoutes
