const { config } = require("./../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: config.dbName,
    host: "127.0.0.1",
    port: config.dbPort,
    dialect: "mysql",
  },
  production: {
    url: URI,
    dialect: "mysql",
  },
};
