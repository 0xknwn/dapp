import { useContext, createContext } from "react";
import { type StarknetWindowObject } from "starknetkit";

export const WalletContext = createContext<{
  wallet: StarknetWindowObject | null;
  connectorData: { account?: string; chainId?: bigint };
  setConnectorData: (data: { account?: string; chainId?: bigint }) => void;
  setWallet: (wallet: StarknetWindowObject | null) => void;
}>({
  wallet: null,
  connectorData: {},
  setConnectorData: () => {},
  setWallet: () => {},
});

export const useWallet = () => {
  return useContext(WalletContext);
};
