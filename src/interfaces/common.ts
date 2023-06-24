import { SortOrder } from 'mongoose';
import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: Array<IGenericErrorMessage>;
};

export type IResponsePayload<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  data?: T | null;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IPaginationReturnResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
