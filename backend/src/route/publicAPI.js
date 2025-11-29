import express from "express";
import userController from "../controller/user-controller.js";
import { authenticateToken } from "../middleware/authmiddleware.js";

const publicRouter = new express.Router();

publicRouter.post("/register", authenticateToken, userController.register);
publicRouter.post("/login", userController.login);
publicRouter.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
});

export { publicRouter };
