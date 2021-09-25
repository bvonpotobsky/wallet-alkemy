const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("THE SERVER HAS STARTED");
});

// ROUTES
// POST NEW Transaction
app.get("/transactions", async (req, res) => {
  try {
    const { text, amout, date } = req.body;
    const newTransaction = await pool.query(
      "INSERT INTO transactions (text, amount, date) VALUES ($1, $2, $3) RETURNING *",
      [text, amount, date]
    );

    res.json(newTransaction.rows[0]);
    console.log("Transaction has been added");
  } catch (err) {
    console.error(err.message);
  }
});

// GET ALL Transactions
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await pool.query("SELECT * FROM transactions");

    res.json(transactions.rows);
    console.log("Showing Transactions");
  } catch (err) {
    console.error(err.message);
  }
});

// GET /:id Transaction
app.get("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );

    res.json(transaction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE Transaction
app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTransaction = await pool.query(
      "DELETE FROM transactions WHERE id = $1",
      [id]
    );

    res.json("Transaction was deleted");
    console.log("Transaction was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE Transaction { text }
app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const updateTransaction = await pool.query(
      "UPDATE transactions SET text = $1 WHERE id = $2",
      [text, id]
    );

    res.json("Transaction was updated");
    console.log("Transaction was updated");
  } catch (err) {
    console.error(err.message);
  }
});
