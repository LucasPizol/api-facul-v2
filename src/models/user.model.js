const knex = require("../data/connection");
const { ConflictException } = require("../routes/responses");
const { bcryptService } = require("../services/bcrypt.service");
const { jwtService } = require("../services/jwt.service");
const { formatPhone } = require("../utils/format-phone");

class User {
  async new(name, email, password, role, phone) {
    const findUser = await this.findByEmail(email);

    if (findUser)
      throw new ConflictException("User already exists with this email");

    const hashedPassword = await bcryptService.hash(password);

    return await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      role,
      phone: formatPhone(phone),
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

  async findByPhone(phone) {
    return (
      await knex("users")
        .select(["id", "name", "email", "role"])
        .where({ phone: formatPhone(phone) })
    )[0];
  }

  async authenticate(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isSamePassword = await bcryptService.compare(password, user.password);

    if (!isSamePassword) return null;

    const { password: _, ...userWithoutPassword } = user;

    const token = jwtService.sign(userWithoutPassword, { expiresIn: "1d" });

    return { ...userWithoutPassword, token };
  }
}

module.exports = { User: new User() };
