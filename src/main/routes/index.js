const { Router } = require("express");

const {
  userRouter,
  authRouter,
  resetPasswordRouter,
} = require("./controller-routes");

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/reset-password", resetPasswordRouter);

module.exports = { router };
