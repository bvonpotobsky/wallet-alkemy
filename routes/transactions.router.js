const express = require("express");

const TransactionService = require("../services/transactions.service");
const validatorHandler = require("../middlewares/validator.handler");

const {
  getTransactionSchema,
  createTransactionSchema,
  updateTransactionSchema,
} = require("../schemas/transaction.schema");

const router = express.Router();
const service = new TransactionService();

router.get("/", async (req, res) => {
  try {
    const transactions = await service.getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/:id",
  validatorHandler(getTransactionSchema, "params"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await service.getTransactionById(id);
      res.json(transaction);
    } catch (err) {
      console.log(err.message);
    }
  }
);

router.post(
  "/",
  validatorHandler(createTransactionSchema, "body"),
  async (req, res) => {
    try {
      const { description, amount, date } = req.body;
      const transaction = await service.createTransaction({
        description,
        amount,
        date,
      });
      res.json(transaction);
    } catch (err) {
      console.log(err.message);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getTransactionSchema, "params"),
  validatorHandler(updateTransactionSchema, "body"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const updatedTransactions = await service.updateTransaction(id, body);
      return res.json(updatedTransactions);
    } catch (err) {
      console.error(err.message);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getTransactionSchema, "params"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTransaction = await service.deleteTransaction(id);

      return res.json(deletedTransaction);
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
