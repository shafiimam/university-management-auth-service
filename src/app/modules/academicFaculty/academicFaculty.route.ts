import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  RequestValidation.validateRequest(
    AcademicFacultyValidation.createFacultyZodSchema
  ),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
  '/:id',
  RequestValidation.validateRequest(
    AcademicFacultyValidation.updatefacultyZodSchema
  ),
  AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
