import { z } from 'zod';
import { bloodGroup, gender } from '../user/user.constant';

const createFacultyUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z
      .object({
        name: z.object({
          firstName: z.string({
            required_error: 'Firstname is required',
          }),
          middleName: z.string().optional(),
          lastName: z.string({
            required_error: 'Lastname is required',
          }),
        }),
        gender: z.enum(gender, {
          required_error: 'Gender is required',
        }),
        dateOfBirth: z.string({
          required_error: 'Date of Birth is required',
        }),
        academicDepartment: z.string({
          required_error: 'Academic department is required',
        }),
        academicFaculty: z.string({
          required_error: 'Academic faculty is required',
        }),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .email(),
        contactNo: z.string({
          required_error: 'Contact No is required',
        }),
        emergencyContactNo: z.string({
          required_error: 'Contact No is required',
        }),
        bloodGroup: z.enum(bloodGroup).optional(),
        presentAddress: z.string({
          required_error: 'Present Address is required',
        }),
        permanentAddress: z.string({
          required_error: 'Permanent Address is required',
        }),
      })
      .optional(),
  }),
});

const updatefacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),
    gender: z.enum(gender).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum(bloodGroup).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const FacultyValidation = {
  createFacultyUserZodSchema,
  updatefacultyZodSchema,
};
