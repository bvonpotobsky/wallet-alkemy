import dayjs from "dayjs";

function TransactionItem({ text, amount, date, deleteTransaction }) {
  // Formats the displayed DATE
  function formatDate(date) {
    return dayjs(date).format("DD/MM/YY");
  }

  const defineAmountColor = (amount) => {
    return amount < 0 ? "expense" : "income";
  };

  const defineAmountSign = (amount) => {
    return amount < 0 ? "-" : "+";
  };

  return (
    <li className="History__list__item">
      <button
        className="History__list__item--deleteBtn"
        onClick={deleteTransaction}
      >
        🗑️
      </button>
      <p className="History__list__item--desc">{text}</p>
      <div>
        <p className="History__list__item--date">{formatDate(date)}</p>
        <p
          className={`History__list__item--amount ${defineAmountColor(amount)}`}
        >
          {/* The amount value goes here*/}
          {defineAmountSign(amount)}${Math.abs(amount)}
          {/* +$10 / -$10 */}
        </p>
      </div>
      <button className="History__list__item--editBtn">✏️</button>
    </li>
  );
}

export { TransactionItem };
