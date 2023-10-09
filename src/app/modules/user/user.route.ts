import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import { FacultyValidation } from '../faculty/faculty.validation';
import { UserController } from './user.controller';
import UserValidation from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  RequestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  RequestValidation.validateRequest(
    FacultyValidation.createFacultyUserZodSchema
  ),
  UserController.createFaculty
);

const UserRoutes = router;

export default UserRoutes;
