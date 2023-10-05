import { CastError } from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: CastError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
