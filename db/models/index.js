const { Transaction, TransactionSchema } = require("./transactions.model");

function setupModels(sequelize) {
  Transaction.init(TransactionSchema, Transaction.config(sequelize));
}

module.exports = setupModels;
