const env = require("../main/env");

const knex = require("knex")({
  client: "mysql2",

  connection: {
    host: env.db.host,
    port: 3306,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
  },
});

module.exports = knex;
