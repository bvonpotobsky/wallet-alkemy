import { WalletProvider } from "../context/WalletContext";
import { AppUI } from "./AppUI";

function App() {
  return (
    <WalletProvider>
      <AppUI />
    </WalletProvider>
  );
}

export { App };
