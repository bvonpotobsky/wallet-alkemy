const Joi = require("joi");

const id = Joi.number().integer();
const description = Joi.string().max(255);
const amount = Joi.number().integer();
const date = Joi.string().max(255);

const getTransactionSchema = Joi.object({
  id: id.required(),
});

const createTransactionSchema = Joi.object({
  description: description.required(),
  amount: amount.required(),
  date: date.required(),
});

const updateTransactionSchema = Joi.object({
  description: description,
  amount: amount,
});

module.exports = {
  getTransactionSchema,
  createTransactionSchema,
  updateTransactionSchema,
};
