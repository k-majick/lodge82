import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const router = express.Router();

router.post("/register", (req, res, _) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.getUserByEmail(req.body.email, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({
        success: false,
        msg: "E-mail exists",
      });
    }

    User.getUserByUsername(req.body.username, (err, user) => {
      if (err) throw err;
      if (user) {
        return res.json({
          success: false,
          msg: "User exists",
        });
      }

      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to register new user",
          });
        } else {
          res.json({
            success: true,
            msg: "User registered",
          });
        }
      });
    });
  });
});

router.post("/authenticate", (req, res, _) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          {
            data: user,
          },
          process.env.SECRET,
          {
            expiresIn: 604800, // 1 week
          }
        );

        res.json({
          success: true,
          msg: "You are now logged in",
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
          msg: "Wrong password",
        });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: true,
  }),
  (req, res, _) => {
    res.json({
      user: req.user,
    });
  }
);
