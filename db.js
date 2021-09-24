const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Manuginobili5",
  host: "localhost",
  port: "5432",
  database: "wallet",
});

module.exports = pool;
