import { createContext, useState, useEffect } from "react";

const WalletContext = createContext();

function WalletProvider(props) {
  //! const test = { id: 1, text: "test", amounts: 20, date: "2021-09-25" };

  const [transactions, setTransactions] = useState([]);

  // All transactions amounts
  const amounts = transactions.map((transaction) =>
    parseFloat(transaction.amount)
  );

  // GET ALL Transactions
  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transactions");
      const data = await response.json();

      setTransactions(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // ADD Transaction
  const addTransaction = async (text, amount, date) => {
    try {
      const body = { text, amount, date };
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("Transaction has been added:", response.status);
      // Re-render
      getTransactions();
    } catch (err) {
      console.error(err.message);
    }
  };

  // DELETE /:id Transaction
  const deleteTransaction = async (id) => {
    try {
      const deleteTransaction = await fetch(
        `http://localhost:5000/transactions/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log("Transaction was deleted:", deleteTransaction.status);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // Re-render transaction list
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        transactions,
        getTransactions,
        addTransaction,
        deleteTransaction,
        amounts,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };
