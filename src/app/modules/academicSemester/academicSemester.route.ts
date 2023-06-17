import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-user',
  RequestValidation.validateRequest(
    AcademicSemesterValidation.createAademicSemesterZodSchema
  )
);

const UserRoutes = router;

export default UserRoutes;
