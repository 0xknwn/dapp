import { WalletContext } from "./wallet_context";
import { type StarknetWindowObject } from "starknetkit";
import { useState } from "react";
type WalletProviderProps = {
  children: React.ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState(null as StarknetWindowObject | null);
  const [connectorData, setConnectorData] = useState(
    {} as { account?: string; chainId?: bigint }
  );

  const value = {
    wallet,
    connectorData,
    setWallet,
    setConnectorData,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
