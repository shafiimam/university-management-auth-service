import express from 'express';
import { RequestValidation } from '../../../middleWares/validateRequest';
import StudentController from './student.controller';
import { StudentValidaion } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  RequestValidation.validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

const StudentRoutes = router;

export default StudentRoutes;
