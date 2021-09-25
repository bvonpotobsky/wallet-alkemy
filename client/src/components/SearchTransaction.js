import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function SearchTransaction() {
  const { searchValue, setSearchValue } = useContext(WalletContext);

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <input
      className="SearchTransaction"
      placeholder="Search your transactions"
      value={searchValue}
      onChange={onSearchValueChange}
    />
  );
}

export { SearchTransaction };
