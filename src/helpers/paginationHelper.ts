import {
  IPaginationOptions,
  IPaginationReturnResult,
} from '../interfaces/common';

const calculatePagination = (
  options: IPaginationOptions
): IPaginationReturnResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
