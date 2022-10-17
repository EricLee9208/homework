// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "cohort",
      username: "yeosujin",
      password: "Sujin9032",
    },

    migrations: {
      tableName: "migrations",
      directory: "./db/migrations",
    },
  },
};
