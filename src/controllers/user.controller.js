const { User } = require("../models/Users");

class UserController {
  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.new(name, email, password, role);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = { UserController: new UserController() };
