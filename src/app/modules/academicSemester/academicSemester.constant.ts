import {
  IAcademicSemesterCodes,
  IAcademinSemesterTitles,
  IMonths,
} from './academicSemester.interface';

export const academicSemesterMonths: ReadonlyArray<IMonths> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterTitles: ReadonlyArray<IAcademinSemesterTitles> = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: ReadonlyArray<IAcademicSemesterCodes> = [
  '01',
  '02',
  '03',
];

export const academicSemeterTitlesCodeMapper: {
  [Key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
