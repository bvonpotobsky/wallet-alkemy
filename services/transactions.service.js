const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class TransactionService {
  constructor() {}

  async createTransaction(data) {
    const transaction = await models.Transaction.create(data);

    return transaction;
  }

  async getAllTransactions() {
    const transactions = await models.Transaction.findAll();
    return transactions;
  }

  async getTransactionById(id) {
    const transaction = await models.Transaction.findByPk(id);
    if (!transaction) {
      throw boom.notFound(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  async updateTransaction(id, changes) {
    const transaction = await this.getTransactionById(id);
    if (!transaction) {
      throw boom.notFound(`Transaction with id ${id} not found`);
    }

    const updatedTransaction = await transaction.update(changes);

    return updatedTransaction;
  }

  async deleteTransaction(id) {
    const transaction = await models.Transaction.findByPk(id);

    if (!transaction) {
      throw boom.notFound(`Transaction with id ${id} not found`);
    }

    const deletedTransaction = await transaction.destroy();

    return deletedTransaction;
  }
}

module.exports = TransactionService;
