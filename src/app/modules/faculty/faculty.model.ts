import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

const FacultySchema = new Schema<IFaculty, FacultyModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  profileImage: {
    type: String,
  },
});

const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);

export default Faculty;
