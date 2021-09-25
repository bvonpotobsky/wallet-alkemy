import { Balance } from "./Balance";
import { IncomeExpense } from "./IncomeExpense";
import { TransactionsList } from "./TransactionsList";
import { TransactionItem } from "./TransactionItem";
import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { Form } from "./Form";

function AppUI() {
  const { transactions, deleteTransaction } = useContext(WalletContext);

  return (
    <>
      <Balance />
      <IncomeExpense />
      <TransactionsList>
        {transactions.map((transaction) => (
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
