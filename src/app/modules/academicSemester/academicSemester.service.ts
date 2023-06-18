import ApiError from '../../../errors/APIError';
import { academicSemeterTitlesCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemeterTitlesCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Academic Semester title and code does not match!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
