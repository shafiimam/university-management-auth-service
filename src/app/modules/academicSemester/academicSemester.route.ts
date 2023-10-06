import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();


router.get('/', AcademicSemesterController.getAllSemester);
router.get('/:id', AcademicSemesterController.getSingleSemester);

router.post(
  '/create-semester',
  RequestValidation.validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodSchema
  ),
  AcademicSemesterController.createAcademicSemester
);
router.patch(
  '/:id',
  RequestValidation.validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterZodSchema
  ),
  AcademicSemesterController.updateSemester
);
router.delete('/:id', AcademicSemesterController.deleteSemester);
const AcademicSemesterRoutes = router;

export default AcademicSemesterRoutes;
