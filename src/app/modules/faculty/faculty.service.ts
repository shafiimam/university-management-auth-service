import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/APIError';
import calculatePagination from '../../../helpers/paginationHelper';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import Faculty from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty');

  const total = await Faculty.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  return await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const ifExist = await Faculty.findOne({ id });

  if (!ifExist) throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');

  const { name, ...facultyData } = payload;

  const updateFacultyData: Partial<IFaculty> = { ...facultyData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  });
  return result;
};

export default {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
