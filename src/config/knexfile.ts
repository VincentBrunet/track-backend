require("ts-node/register");

var os = require("os");

var username = os.userInfo().username;
if (username === "othervincent") {
  module.exports = {
    client: "pg",
    connection: {
      user: "othervincent",
      password: "",
      database: "track",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./../../migrations",
    },
    timezone: "UTC",
  };
}
else {
  module.exports = {
    client: "pg",
    connection: {
      user: "vincent",
      password: "vincent",
      database: "track",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./../../migrations",
    },
    timezone: "UTC",
  };
}

export default module.exports;
