import { useContext, useState } from "react";
import { WalletContext } from "../context/WalletContext";

function Form() {
  // Sets initial values for the datepicker
  const now = new Date();
  const day = now.getDate().toString();
  // This brings the month without the 0 in front
  const m = (now.getMonth() + 1).toString();
  // Month formatted
  const month = m > 9 ? m : "0" + m;
  const year = now.getFullYear().toString();

  // Input states
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(`${year}-${month}-${day}`);

  const { addTransaction } = useContext(WalletContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    addTransaction(text, amount, date);

    // Set the INPUT values back to the default values when submitting
    setAmount("");
    setText("");
    setDate(`${year}-${month}-${day}`);
  };

  return (
    <section className="AddNew">
      <h2 className="AddNew__title">Add new transaction</h2>
      <form id="form" className="Form" autoComplete="off" onSubmit={onSubmit}>
        <div className="Form__one">
          <input
            className="Form__one--text"
            type="text"
            name="text"
            id="text"
            placeholder="Enter description..."
            autoFocus
            required
            spellCheck="false"
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <p className="Form__explanation">
          <span className="Form__explanation--income">+ for income</span>
          ||
          <span className="Form__explanation--expense">- for expense</span>
        </p>
        <div className="Form__two">
          <input
            className="Form__two--amount"
            type="number"
            name="amount"
            id="amount"
            placeholder="Amount"
            required
            autoComplete="off"
            step="any"
            max="9999999"
            min="-9999999"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="Form__two--date"
            type="date"
            name="date"
            id="date"
            min={"2001-09-11"}
            max={`${year}-${month}-${day}`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button id="form" type="submit" className="Form__button">
          +
        </button>
      </form>
    </section>
  );
}

export { Form };
