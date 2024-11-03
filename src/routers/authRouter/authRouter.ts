import { Router } from "express";

import authController from "../../controllers/authController/authController";
import { validateDataMiddleware } from "../../middlewares/validationMiddleware";
import {
  sendOTPSchema,
  userLoginSchema,
  userRegistrationSchema,
  userUpdateEmailSchema,
  userUpdatePasswordSchema,
  userUpdateSchema,
  verifyUserSchema
} from "../../validation/zod";
import rateLimiterMiddleware from "../../middlewares/rateLimiterMiddleware";
import { OTPALREADYSENT } from "../../constants/index";
import userController from "../../controllers/authController/userController";
import authMiddleware from "../../middlewares/authMiddleware";
export const authRouter = Router();

// Routes**
authRouter.route("/register").post(validateDataMiddleware(userRegistrationSchema), authController.registerUser);

authRouter
  .route("/verifyEmail")
  // 2 req per minute from single  ip adress
  .post(validateDataMiddleware(verifyUserSchema), (req, res, next) => rateLimiterMiddleware(req, res, next, 5), authController.verifyUser);

authRouter
  .route("/sendOTP")
  // 1 req per minute from single  ip adress
  .post(validateDataMiddleware(sendOTPSchema), (req, res, next) => rateLimiterMiddleware(req, res, next, 10, OTPALREADYSENT), authController.sendOTP);

authRouter
  .route("/login")
  // 5 req per mnute from single  ip adress
  .post(validateDataMiddleware(userLoginSchema), (req, res, next) => rateLimiterMiddleware(req, res, next, 2), authController.loginUser);

authRouter.route("/updateInfo").patch(
  authMiddleware.checkToken,
  validateDataMiddleware(userUpdateSchema),
  // 1 req per minute from single  ip adress
  (req, res, next) => rateLimiterMiddleware(req, res, next, 10),
  userController.updateInfo
);
authRouter.route("/updateEmail").patch(
  authMiddleware.checkToken,
  validateDataMiddleware(userUpdateEmailSchema),
  // 1 req per minute from single  ip adress
  (req, res, next) => rateLimiterMiddleware(req, res, next, 10),
  userController.updateEmail
);

authRouter.route("/updatePassword").patch(
  authMiddleware.checkToken,
  validateDataMiddleware(userUpdatePasswordSchema),
  // 1 req per minute from single  ip adress
  (req, res, next) => rateLimiterMiddleware(req, res, next, 10),
  userController.updatePassword
);
authRouter.route("/updatePassword").patch(
  authMiddleware.checkToken,
  authMiddleware.checkIfUserIsAdmin,
  // 1 req per minute from single  ip adress
  (req, res, next) => rateLimiterMiddleware(req, res, next, 10),
  userController.updateRole
);
