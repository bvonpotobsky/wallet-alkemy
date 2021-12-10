const { config } = require("./../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: config.dbName,
    host: "172.20.0.2",
    port: config.dbPort,
    dialect: "mysql",
  },
  production: {
    url: URI,
    dialect: "mysql",
  },
};
