import { Router } from "express";
import { UserController } from "../controllers/userController";
import { FormController } from "../controllers/formController";
import passport from "passport";
import "../config/passportHandler";

export class UserRoutes {
  public router: Router;
  public userController: UserController = new UserController();
  public formController: FormController = new FormController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // Use Identity Provider in production
    this.router.post("/register", this.userController.registerUser);
    this.router.post("/login", this.userController.authenticateUser);
    this.router.get(
      "/profile",
      passport.authenticate("jwt", {
        session: true,
      }),
      this.userController.getProfile,
    );
    this.router.post("/sendEmail", this.formController.sendEmail);
  }
}
