import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import FacultyService from './faculty.service';

const getAllFaculties: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FacultyService.getAllFaculties(
      filters,
      paginationOptions
    );

    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FacultyService.getSingleFaculty(id as string);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty fetched successfully',
      data: result,
    });
  }
);

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await FacultyService.updateFaculty(id, payload);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export default {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
};
