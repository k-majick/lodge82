import { Document, model, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  getUserById(jwt_payload: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser>;
  comparePassword(candidate: string, hash: string): Promise<boolean>;
  createUser(user: IUser): Promise<IUser>;
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.getUserById = async (id: number): Promise<IUser | null> => {
  const user = await User.findById(id);

  return await new Promise(resolve => resolve(user));
};

userSchema.methods.getUserById = async (
  id: number,
): Promise<IUser | null> => {
  const user = User.findById(id);

  return await new Promise(resolve => resolve(user));
};

userSchema.methods.getUserByEmail = async (
  email: string,
): Promise<IUser | null> => {
  const query = {
    email: email,
  };
  const user = await User.findOne(query);

  return await new Promise(resolve => resolve(user));
};

userSchema.methods.getUserByUsername = async (
  username: string,
): Promise<IUser | null> => {
  const query = {
    username: username,
  };
  const user = await User.findOne(query);

  return await new Promise(resolve => resolve(user));
};

userSchema.methods.comparePassword = async (
  candidatePassword: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(candidatePassword, hash);

  return await new Promise(resolve => resolve(isMatch));
};

userSchema.methods.createUser = async (newUser: IUser): Promise<IUser> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newUser.password, salt);

  newUser.password = hash;
  newUser.save();

  return await new Promise(resolve => resolve(newUser));
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
