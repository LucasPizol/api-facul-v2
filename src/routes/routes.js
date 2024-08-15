const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");

const router = Router();
router.post("/users", UserController.create);

module.exports = { router };
