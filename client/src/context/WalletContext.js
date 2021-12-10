import axios from "axios";

import { createContext, useState, useEffect } from "react";

const WalletContext = createContext();

function WalletProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  // Modal to edit transaction text
  const [openModal, setOpenModal] = useState(false);

  // All transactions amounts
  const amounts = transactions?.map((transaction) =>
    parseFloat(transaction.amount)
  );

  const API_URL = "https://wallet-pern.herokuapp.com/api/v1/transactions/";

  // GET ALL Transactions
  const getTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = await response.data;

      setTransactions(data);
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  // ADD Transaction
  const addTransaction = async (description, amount, date) => {
    try {
      const response = await axios.post(API_URL, {
        description,
        amount,
        date,
      });
      const data = await response.data;

      setTransactions([...transactions, data]);
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  // DELETE /:id Transaction
  const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);

      // Re-render the transactions
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
      return response;
    } catch (err) {
      console.error(err.message);
    }
  };

  // UPDATE /:id Transaction
  const updateTransaction = async (newText, id) => {
    try {
      const response = await axios.put(`${API_URL}${id}`, {
        description: newText,
      });

      // Re-render the transactions
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, description: newText }
            : transaction
        )
      );

      return response;
    } catch (err) {
      console.error(err.message);
    }
  };

  // Re-render transaction list
  useEffect(() => {
    getTransactions();
  }, []);

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
      const transactionsText = transaction.description.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return transactionsText.includes(searchText);
    });
  }

  // Set ammount with commas
  function displayWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
