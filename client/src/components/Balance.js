import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function Balance() {
  const { amounts, displayWithCommas } = useContext(WalletContext);

  // Sum of all amounts
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // Define the color for the balance amount
  const defineClass = () => {
    return total > 0 ? "income" : total < 0 ? "expense" : "";
  };

  return (
    <header className="Header">
      <div className="Header__greetings">
        <p className="Header__greetings--p2">Hello,</p>
        <p className="Header__greetings--p1">Welcome back 👋</p>
      </div>
      <div className="Header__balance">
        <p className="Header__balance--p1">Balance</p>
        <p id="balance" className={`Header__balance--p2 ${defineClass()}`}>
          ${displayWithCommas(total)}
        </p>
      </div>
    </header>
  );
}

export { Balance };
