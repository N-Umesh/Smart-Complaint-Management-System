import express from "express";

import {
  signup,
  login,
  checkAuth,
  updateProfile,
  logout,
} from "../controllers/userController.js";

import {
  protectRoute,
} from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  signup
);

userRouter.post(
  "/login",
  login
);

userRouter.get(
  "/check-auth",
  protectRoute,
  checkAuth
);

userRouter.put(
  "/profile",
  protectRoute,
  updateProfile
);

userRouter.post(
  "/logout",
  logout
);

export default userRouter;