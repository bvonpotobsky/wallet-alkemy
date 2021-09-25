import { useContext, useState } from "react";
import { WalletContext } from "../../context/WalletContext";

function EditForm({ id, text }) {
  const { setOpenModal, updateTransaction } = useContext(WalletContext);

  const [newText, setNewText] = useState(text);

  const onEdit = (e) => {
    e.preventDefault();
    updateTransaction(newText, id);
  };

  return (
    <div className="EditForm">
      <h3 className="EditForm__title">Edit your transaction</h3>
      <form onSubmit={onEdit}>
        <input
          className="EditForm__input"
          type="text"
          name="edit"
          id="edit"
          placeholder="Enter new description..."
          autoFocus
          required
          spellCheck="false"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button
          onClick={() => setOpenModal(false)}
          className="EditForm__cancel"
          type="button"
        >
          Cancel
        </button>
        <button className="EditForm__submit" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export { EditForm };
