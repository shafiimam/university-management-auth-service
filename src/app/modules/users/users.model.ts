import { Schema, model } from 'mongoose'
import { IUser, IUserMethods, UserModel } from './users.interface'

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
userSchema.method('getId', function getId() {
  return this.id
})

const User = model<IUser>('User', userSchema)
export default User
