const { Router } = require("express");
const { UserController } = require("../controllers/user.controller");
const { User } = require("../models/Users");

const router = Router();
router.post("/users", UserController.create);
router.get("/users", UserController.findAll)
router.get("/user/:id", UserController.findById)
router.put("/user/:id", UserController.update)
router.delete("/user/:id", UserController.delete)

module.exports = { router };
