import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z
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
        academicSemester: z.string({
          required_error: 'Academic semester is required',
        }),
        academicDepartment: z.string({
          required_error: 'Academic department is required',
        }),
        academicFaculty: z.string({
          required_error: 'Academic faculty is required',
        }),
        guardian: z
          .object({
            fatherName: z.string().optional(),
            fatherOccupation: z.string().optional(),
            fatherContactNo: z.string().optional(),
            motherName: z.string().optional(),
            motherOccupation: z.string().optional(),
            motherContactNo: z.string().optional(),
            address: z.string().optional(),
          })
          .optional(),
        localGuardian: z
          .object({
            name: z.string().optional(),
            occupation: z.string().optional(),
            contactNo: z.string().optional(),
            address: z.string().optional(),
          })
          .optional(),
        profileImage: z.string().optional(),
      })
      .optional(),
  }),
});

export default {
  createUserZodSchema,
};
