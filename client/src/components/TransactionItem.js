import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { Modal } from "./EditModal/Modal";
import { EditForm } from "./EditModal/EditForm";

import dayjs from "dayjs";

function TransactionItem({ id, description, amount, date, deleteTransaction }) {
  const { displayWithCommas, openModal, setOpenModal } =
    useContext(WalletContext);

  const onEdit = () => {
    setOpenModal(true);
  };

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
      <p className="History__list__item--desc">{description}</p>
      <div>
        <p className="History__list__item--date">{formatDate(date)}</p>
        <p
          className={`History__list__item--amount ${defineAmountColor(amount)}`}
        >
          {/* The amount value goes here*/}
          {defineAmountSign(amount)}${displayWithCommas(Math.abs(amount))}
          {/* +$10 / -$10 */}
        </p>
      </div>
      <button onClick={onEdit} className="History__list__item--editBtn">
        ✏️
      </button>

      {openModal && (
        <Modal>
          <EditForm id={id} description={description} />
        </Modal>
      )}
    </li>
  );
}

export { TransactionItem };
