import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from "./wallet";
import Router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletProvider>
      <Router />
    </WalletProvider>
  </StrictMode>
);
