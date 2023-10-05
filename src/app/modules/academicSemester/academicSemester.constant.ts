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

export type IAcademicSemesterFilters = {
  searchTerm: string;
  title?: string;
  code?: string;
  year?: string;
};

export const acedemicSemesterSearchableFields = ['title', 'code', 'year'];

export const acedemicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];