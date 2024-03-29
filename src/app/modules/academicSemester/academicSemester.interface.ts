import { Model } from 'mongoose';
export type IMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademinSemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCodes = '01' | '02' | '03';
export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';
  year: string;
  code: '01' | '02' | '03';
  startMonth: IMonths;
  endMonth: IMonths;
};

export type IAcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;
