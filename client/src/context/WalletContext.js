import { createContext, useState, useEffect } from "react";

const WalletContext = createContext();

function WalletProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  // Modal to edit transaction text
  const [openModal, setOpenModal] = useState(false);

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

  // UPDATE /:id Transaction
  const updateTransaction = async (newText, id) => {
    try {
      const body = { newText };
      const editTransaction = await fetch(
        `http://localhost:5000/transactions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(editTransaction);
      getTransactions();
      setOpenModal(false);
    } catch (err) {
      console.error(err.message);
      console.log(err);
    }
  };

  // SEARCH transactions
  const [searchValue, setSearchValue] = useState("");
  let searchedTransactions = [];
  if (!searchValue.length >= 1) {
    // Sort transaction by date
    searchedTransactions = transactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  } else {
    searchedTransactions = transactions.filter((transaction) => {
      const transactionsText = transaction.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return transactionsText.includes(searchText);
    });
  }

  // Set ammount with commas
  function displayWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Re-render transaction list
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        transactions,
        amounts,
        getTransactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        searchValue,
        setSearchValue,
        searchedTransactions,
        displayWithCommas,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };
