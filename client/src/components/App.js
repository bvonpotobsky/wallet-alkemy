import { StrictMode } from "react";
import { WalletProvider } from "../context/WalletContext";
import { AppUI } from "./AppUI";

function App() {
  return (
    <StrictMode>
      <WalletProvider>
        <AppUI />
      </WalletProvider>
    </StrictMode>
  );
}

export { App };
