import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['student', 'faculty', 'admin'],
    },
    password: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.method('getId', function getId() {
  return this.id;
});

const User = model<IUser, UserModel>('User', userSchema);
export default User;
