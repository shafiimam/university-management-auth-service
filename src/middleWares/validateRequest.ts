import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export const RequestValidation = {
  validateRequest,
}
