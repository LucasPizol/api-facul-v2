const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");
const { adapter } = require("./adapter");
const { ensureAuthentication } = require("../middleware/ensure-auth");

const router = Router();
router.post("/users", adapter(UserController.create));
router.get("/users", adapter(UserController.findAll));
router.get("/user/:id", adapter(UserController.findById));
router.put("/user/:id", adapter(UserController.update));
router.delete("/user/:id", adapter(UserController.delete));
router.post("/auth", adapter(UserController.authenticate));

router.get("/auth", ensureAuthentication, adapter(UserController.current))

module.exports = { router };
