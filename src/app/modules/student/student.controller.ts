import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import StudentService from './student.service';

const getAllStudents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StudentService.getSingleStudent(req.params.id);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  }
);

const updateStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await StudentService.updateStudent(id, req.body);
    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  }
);
export default {
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
