import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/APIError';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface';
const academicSemesterSchema = new Schema<
  IAcademicSemester,
  IAcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicSemesterSchema.pre('save', async function (next) {
  //validate
  const doesExist = await AcademicSemester.findOne({
    year: this.year,
    title: this.title,
    code: this.code,
  });
  if (doesExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester already exists!'
    );
  }
  next();
});

const AcademicSemester = model<IAcademicSemester, IAcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

export default AcademicSemester;
