import { Balance } from "./Balance";
import { IncomeExpense } from "./IncomeExpense";
import { TransactionsList } from "./TransactionsList";
import { TransactionItem } from "./TransactionItem";
import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { Form } from "./Form";
import { SearchTransaction } from "./SearchTransaction";

function AppUI() {
  const { searchedTransactions, deleteTransaction } = useContext(WalletContext);

  return (
    <>
      <Balance />
      <IncomeExpense />
      <SearchTransaction />
      <TransactionsList>
        {searchedTransactions.map((transaction) => (
          <TransactionItem
            id={transaction.id}
            key={transaction.id}
            text={transaction.text}
            amount={transaction.amount}
            date={transaction.date}
            deleteTransaction={() => deleteTransaction(transaction.id)}
          />
        ))}
      </TransactionsList>
      <Form />
    </>
  );
}

export { AppUI };
