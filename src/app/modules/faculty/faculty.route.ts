import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import FacultyController from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);

router.post(
  '/create-faculty',
  RequestValidation.validateRequest(
    FacultyValidation.createFacultyUserZodSchema
  ),
  FacultyController.createFaculty
);

router.patch(
  '/:id',
  RequestValidation.validateRequest(FacultyValidation.updatefacultyZodSchema),
  FacultyController.updateFaculty
);

const FacultyRoutes = router;

export default FacultyRoutes;
