import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: Array<IGenericErrorMessage> = Object.values(err.errors).map(
    (item: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: item?.path, message: item?.message }
    }
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  }
}

export default handleValidationError
