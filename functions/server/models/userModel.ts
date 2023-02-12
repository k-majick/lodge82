import { Document, model, Model, Schema, Error } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  comparePassword(
    candidate: string,
    hash: string,
    callback: Function,
  ): Promise<boolean>;
  getUserByEmail(email: string, callback: Function): IUser;
  getUserByUsername(username: string, callback: Function): IUser;
  getUserById(jwt_payload: string, callback: Function): IUser;
  createUser(user: IUser, callback: Function): IUser;
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

userSchema.methods.getUserById = (id: number, callback: Function) => {
  User.findById(id, callback);
};

userSchema.methods.getUserByEmail = (email: string, callback: Function) => {
  const query = {
    email: email,
  };
  User.findOne(query, callback);
};

userSchema.methods.getUserByUsername = (
  username: string,
  callback: Function,
) => {
  const query = {
    username: username,
  };
  User.findOne(query, callback);
};

userSchema.methods.createUser = (
  newUser: Record<string, any>,
  callback: Function,
) => {
  bcrypt.genSalt(10, (err: Error, salt) => {
    bcrypt.hash(newUser.password, salt, (err: Error, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

userSchema.methods.comparePassword = (
  candidatePassword: string,
  hash: string,
  callback: Function,
) => {
  bcrypt.compare(candidatePassword, hash, (err: Error, isMatch: boolean) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
