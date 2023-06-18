import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: Array<IGenericErrorMessage>
}

export type IResponsePayload<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  data?: T | null;
};