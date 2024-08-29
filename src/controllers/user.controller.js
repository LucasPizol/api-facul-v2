const { User } = require("../models/user.model");
const {
  Created,
  Success,
  NotFoundException,
  NoContent,
  BadRequestException,
  UnauthorizedException,
} = require("../routes/responses");

class UserController {
  async create(req) {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.new(name, email, password, role);

      return new Created({
        id: user[0],
        name,
        email,
        role,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(req) {
    try {
      const users = await User.findAll();

      return new Success(users);
    } catch (error) {
      return error;
    }
  }

  async findById(req) {
    try {
      const { id } = req.params;

      const user = await User.findById(parseInt(id));

      if (!user) throw new NotFoundException("User not found");

      return new Success(user);
    } catch (error) {
      return error;
    }
  }

  async update(req) {
    try {
      const { id } = req.user;

      const { email, name } = req.body;
      if (!Object.keys(req.body).length)
        throw new BadRequestException("No params recieved");

      await User.updateById(parseInt(id), {
        email,
        name,
      });
      return new NoContent();
    } catch (error) {
      return error;
    }
  }

  async delete(req) {
    try {
      const { id } = req.params;

      await User.deleteById(parseInt(id));
      return new NoContent();
    } catch (error) {
      return error;
    }
  }

  async authenticate(req) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new BadRequestException("Missing Params");

      const user = await User.authenticate(email, password);
      if (!user) throw new UnauthorizedException("Unauthorized");

      return new Success(user);
    } catch (error) {
      return error;
    }
  }

  async current(req) {
    const user = req.user;
    return new Success(user);
  }
}

module.exports = { UserController: new UserController() };
