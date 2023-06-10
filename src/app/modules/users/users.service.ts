import config from '../../../config'
import { IUser } from './users.interface'
import User from './users.model'
import usersUtils from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  user.id = await usersUtils.generateStudentId()
  const createdUser = await User.create(user)
  if (!createUser) throw new Error('Failed to create user!')
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

export default {
  createUser,
  findLastUserId,
}
