import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from "./wallet.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>
);
