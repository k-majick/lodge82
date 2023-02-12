import { Router } from 'express';
import { UserController } from '../controllers/userController';
import passport from 'passport';

export class UserRoutes {
  router: Router;
  public userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // Use Identity Provider in production
    this.router.post('/register', this.userController.registerUser);
    this.router.post('/login', this.userController.authenticateUser);
    this.router.get(
      '/profile',
      passport.authenticate('jwt', {
        session: true,
      }),
      this.userController.getProfile,
    );
  }
}
