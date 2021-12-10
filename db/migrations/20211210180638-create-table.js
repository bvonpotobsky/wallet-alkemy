"use strict";

const {
  TransactionSchema,
  TRANSACTIONS_TABLE,
} = require("../models/transactions.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TRANSACTIONS_TABLE, TransactionSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TRANSACTIONS_TABLE);
  },
};
