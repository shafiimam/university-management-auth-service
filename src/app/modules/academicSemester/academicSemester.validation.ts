import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';

const createAademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
    year: z.number({
      required_error: 'year is required',
      invalid_type_error: 'year must be a number',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'semester code is required',
      invalid_type_error: 'semester code must be a string',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
      invalid_type_error: 'start month must be a string',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
      invalid_type_error: 'end month must be a string',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAademicSemesterZodSchema,
};
