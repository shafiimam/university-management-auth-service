import express from 'express';
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
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;
