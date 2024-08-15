const knex = require("../data/connection");
const { bcryptService } = require("../services/Bcrypt");

class User {
  async new(name, email, password, role) {
    const hashedPassword = await bcryptService.hash(password);

    return await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }
}

module.exports = { User: new User() };
