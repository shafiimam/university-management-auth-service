import { Response } from 'express';
import { IResponsePayload } from '../interfaces/common';

const sendResponse = <T>(res: Response, payload: IResponsePayload<T>): void => {
  const { data, statusCode, success, message }: IResponsePayload<T> = payload;
  res.status(statusCode).json({
    success: success,
    message: message || null,
    data,
  });
};

export default sendResponse;
