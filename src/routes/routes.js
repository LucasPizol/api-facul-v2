const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");
const { adapter } = require("./adapter");
const { ensureAuthentication } = require("../middleware/ensure-authentication");
const { ensureAuthorization } = require("../middleware/ensure-authorization");
const {
  ResetPasswordController,
} = require("../controllers/reset-password.controller");
const {
  ensureResetPassword,
} = require("../middleware/ensure-reset-password");

const router = Router();
router.post("/users", adapter(UserController.create));
router.get("/users", adapter(UserController.findAll));
router.get("/user/:id", adapter(UserController.findById));
router.put("/user/", ensureAuthentication, adapter(UserController.update));
router.delete(
  "/user/:id",
  ensureAuthentication,
  ensureAuthorization,
  adapter(UserController.delete)
);
router.post("/auth", adapter(UserController.authenticate));

router.get("/auth", ensureAuthentication, adapter(UserController.current));

router.post("/reset-password", adapter(ResetPasswordController.resetPassword));

router.post(
  "/reset-password/attempt",
  ensureResetPassword,
  adapter(ResetPasswordController.attempt)
);

module.exports = { router };
