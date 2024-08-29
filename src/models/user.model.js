const knex = require("../data/connection");
const { ConflictException } = require("../routes/responses");
const { bcryptService } = require("../services/bcrypt.service");
const { JWTService, jwtService } = require("../services/jwt.service");

class User {
  async new(name, email, password, role) {
    const findUser = await this.findByEmail(email);

    if (findUser)
      throw new ConflictException("User already exists with this email");

    const hashedPassword = await bcryptService.hash(password);

    return await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  async findAll() {
    return await knex("users").select([
      "id",
      "name",
      "email",
      "role",
      "password",
    ]);
  }

  async findById(id) {
    return (
      await knex("users").select(["id", "name", "email", "role"]).where({ id })
    )[0];
  }

  async deleteById(id) {
    return await knex("users").delete().where({ id });
  }

  async updateById(id, data) {
    return await knex("users").update(data).where({ id });
  }

  async findByEmail(email) {
    return (
      await knex("users")
        .select(["id", "name", "email", "role", "password"])
        .where({ email })
    )[0];
  }

  async authenticate(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isSamePassword = await bcryptService.compare(password, user.password);

    if (!isSamePassword) return null;

    const { password: _, ...userWithoutPassword } = user;

    const token = jwtService.sign(userWithoutPassword);

    return { ...userWithoutPassword, token };
  }
}

module.exports = { User: new User() };
