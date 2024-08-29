const { Router } = require("express");
const { adapter } = require(".././../adapters/adapter");
const { UserController } = require("../../../controllers/user.controller");
const { ensureAuthentication } = require("../../../middleware/ensure-authentication");

const router = Router();

router.post("/", adapter(UserController.authenticate));
router.get("/", ensureAuthentication, adapter(UserController.current));

module.exports = {
  authRouter: router,
};
