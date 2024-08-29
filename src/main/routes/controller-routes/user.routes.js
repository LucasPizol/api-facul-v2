const { Router } = require("express");
const { adapter } = require(".././../adapters/adapter");
const { UserController } = require("../../../controllers/user.controller");
const {
  ensureAuthorization,
} = require("../../../middleware/ensure-authorization");
const {
  ensureAuthentication,
} = require("../../../middleware/ensure-authentication");

const router = Router();

router.post("/", adapter(UserController.create));
router.get("/", adapter(UserController.findAll));
router.get("/:id", adapter(UserController.findById));
router.put("/", ensureAuthentication, adapter(UserController.update));
router.delete(
  "/:id",
  ensureAuthentication,
  ensureAuthorization,
  adapter(UserController.delete)
);

module.exports = {
  userRouter: router,
};
