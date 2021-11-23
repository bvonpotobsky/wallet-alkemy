const { Model, DataTypes, Sequelize } = require("sequelize");

const TRANSACTIONS_TABLE = "transactions";

const TransactionSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
};

class Transaction extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TRANSACTIONS_TABLE,
      modelName: "Transaction",
      timestamps: false,
    };
  }
}

module.exports = { Transaction, TransactionSchema, TRANSACTIONS_TABLE };
