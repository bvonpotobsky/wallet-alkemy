import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function IncomeExpense() {
  const { amounts } = useContext(WalletContext);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <section className="Balance">
      <div className="Balance__income">
        <h3>Income</h3>
        <p>${income}</p>
      </div>
      <div className="Balance__expense">
        <h3>Expense</h3>
        <p>${expense}</p>
      </div>
    </section>
  );
}

export { IncomeExpense };
