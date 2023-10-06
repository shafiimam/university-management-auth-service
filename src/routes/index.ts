import express from 'express';
import { academicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route';
import AcademicSemesterRoutes from '../app/modules/academicSemester/academicSemester.route';
import UserRoutes from '../app/modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;
