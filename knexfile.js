const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./database/migrations" },
  seeds: { directory: "./database/seeds" },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      filename: "./database/dogs.db3",
    },
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: "./database/test.db3",
    },
  },
};
