const { Router } = require("express");
const {
  ResetPasswordController,
} = require("../../../controllers/reset-password.controller");
const {
  ensureResetPassword,
} = require("../../../middleware/ensure-reset-password");
const { adapter } = require(".././../adapters/adapter");

const router = Router();

router.post("/", adapter(ResetPasswordController.resetPassword));

router.post(
  "/attempt",
  ensureResetPassword,
  adapter(ResetPasswordController.attempt)
);

module.exports = {
  resetPasswordRouter: router,
};
