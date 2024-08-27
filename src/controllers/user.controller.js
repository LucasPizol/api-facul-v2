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

  async findAll(req, res) {
    try {
      const users = await User.findAll()

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params


      const user = await User.findById(parseInt(id))

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params

      await User.updateById(parseInt(id), req.body)
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      await User.deleteById(parseInt(id))
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = { UserController: new UserController() };
