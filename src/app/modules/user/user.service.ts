import config from '../../../config'
import ApiError from '../../../errors/APIError'
import { IUser } from './user.interface'
import User from './user.model'
import usersUtils from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  user.id = await usersUtils.generateStudentId()
  const createdUser = await User.create(user)
  if (!createUser) throw new ApiError(400, 'Failed to create user!')
  return createdUser
}

const findLastUserId = async (): Promise<string | null | undefined> => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const UserService = {
  createUser,
  findLastUserId,
}
