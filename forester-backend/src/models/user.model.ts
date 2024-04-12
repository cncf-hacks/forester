import { Schema, model } from "mongoose";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  uuid?: string | undefined;
  password: string;
  passwordConfirm: string;
}

const UserSchema = new Schema<User>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  uuid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordConfirm: { type: String, required: true },
});

export const UserModel = model<User>("User", UserSchema);
