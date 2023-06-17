import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Validation error';

  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return { path: issue?.path.join('->'), message: issue?.message };
  });

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleZodError;
