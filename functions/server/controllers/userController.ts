import { NextFunction, Request, Response } from 'express';
import { User, IUser } from '../models/userModel';
import jwt from 'jsonwebtoken';
import passport from 'passport';

export class UserController {
  public async registerUser(req: Request, res: Response): Promise<void> {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.getUserByEmail(req.body.email, (err: Error, user: IUser) => {
      if (err) throw err;
      if (user) {
        return res.json({
          success: false,
          msg: 'validation.registerEmailExists',
        });
      }

      newUser.getUserByUsername(
        req.body.username,
        (err: Error, user: IUser) => {
          if (err) throw err;
          if (user) {
            return res.json({
              success: false,
              msg: 'validation.registerUserExists',
            });
          }

          newUser.createUser(newUser, (err: Error, _: IUser) => {
            if (err) {
              res.json({
                success: false,
                msg: 'validation.registerFail',
              });
            } else {
              res.json({
                success: true,
                msg: 'validation.registerSuccess',
              });
            }
          });
        },
      );
    });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.getUserByUsername(newUser.username, (err: Error, user: IUser) => {
      if (err) throw err;
      if (!user) {
        return res.json({
          success: false,
          msg: 'validation.loginNotFound',
        });
      }

      newUser.comparePassword(
        newUser.password,
        user.password,
        (err: Error, isMatch: boolean) => {
          if (err) throw err;
          if (isMatch) {
            const token = jwt.sign(
              {
                data: user,
              },
              process.env.SECRET as string,
              {
                expiresIn: 604800, // 1 week
              },
            );

            res.json({
              success: true,
              msg: 'validation.loginSuccess',
              token: `Bearer ${token}`,
              user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
              },
            });
          } else {
            return res.json({
              success: false,
              msg: 'validation.loginFail',
            });
          }
        },
      );
    });
  }

  public async getProfile(req: Request, res: Response): Promise<void> {
    res.json({
      user: req.user,
    });
  }
}
