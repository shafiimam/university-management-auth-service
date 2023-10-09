import { Model, Types } from 'mongoose';

export type IFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: IFacultyName;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female';
  permanentAddress: string;
  presentAddress: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  designation: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImage?: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilters = {
  searchTerm?: string;
};
