import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function TransactionsList({ children }) {
  const { transactions } = useContext(WalletContext);

  const totalTransactions = transactions.length;

  return (
    <section className="Transactions">
      <div className="Transactions__header">
        {totalTransactions > 0 && (
          <>
            <h3 className="Transactions__header__title">History</h3>
            <p className="Transactions__header__counter">
              {"you have "}
              {totalTransactions}
              {totalTransactions > 1 ? " transactions" : " transaction"}
            </p>
          </>
        )}
      </div>
      <div className="History">
        <ul className="History__list">{children}</ul>
      </div>
    </section>
  );
}

export { TransactionsList };
