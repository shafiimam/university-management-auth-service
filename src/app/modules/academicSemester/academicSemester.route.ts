import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  RequestValidation.validateRequest(
    AcademicSemesterValidation.createAademicSemesterZodSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

const AcademicSemesterRoutes = router;

export default AcademicSemesterRoutes;
