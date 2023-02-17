import { NextFunction, Request, Response } from "express";
import { User, IUser } from "../models/userModel";
import jwt from "jsonwebtoken";

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.getUserByEmail(req.body.email).then((user: null | IUser) => {
      if (user === null) {
        checkUsername();
        return;
      }

      return res.status(409).json({
        success: false,
        msg: "validation.registerEmailExists",
      });
    });

    const checkUsername = () =>
      newUser.getUserByUsername(newUser.username).then((user: null | IUser) => {
        if (user === null) {
          createUser();
          return;
        }

        return res.status(409).json({
          success: false,
          msg: "validation.registerUserExists",
        });
      });

    const createUser = () =>
      newUser.createUser(newUser).then((user: null | IUser) => {
        if (user) {
          res.status(200).json({
            success: true,
            msg: "validation.registerSuccess",
          });
        } else {
          res.status(500).json({
            success: false,
            msg: "validation.registerFail",
          });
        }
      });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.getUserByUsername(newUser.username).then((user: null | IUser) => {
      if (user) {
        comparePassword(user);
        return;
      }

      return res.status(404).json({
        success: false,
        msg: "validation.userNotFound",
      });
    });

    const comparePassword = (user: IUser) =>
      newUser
        .comparePassword(newUser.password, user.password)
        .then((isMatch: boolean) => {
          if (isMatch) {
            signIn(user);
            return;
          }

          return res.status(401).json({
            success: false,
            msg: "validation.wrongPassword",
          });
        });

    const signIn = (user: IUser) => {
      const token = jwt.sign(
        { data: user },
        process.env.SECRET as string,
        { expiresIn: 604800 }, // 1 week
      );

      return res.status(200).json({
        success: true,
        msg: "validation.loginSuccess",
        token: `Bearer ${token}`,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      });
    };
  }

  public async getProfile(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      user: req.user,
    });
  }
}
