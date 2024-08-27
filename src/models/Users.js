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

  async findAll() {
    return await knex("users").select(["id", "name", "email", "role"])
  }

  async findById(id) {
    return (await knex("users").select(["id", "name", "email", "role"]).where({ id }))[0]
  }

  async deleteById(id) {
    return await knex("users").delete().where({ id })
  }

  async updateById(id, data) {
    return await knex("users").update(data).where({ id })
  }
}

module.exports = { User: new User() };
