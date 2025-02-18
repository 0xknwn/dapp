import { useContext, createContext } from "react";
import { type StarknetWindowObject } from "starknetkit";
import { Contract, WalletAccount } from "starknet";

export const WalletContext = createContext<{
  wallet: StarknetWindowObject | null;
  connectorData: { account?: string; chainId?: bigint };
  setConnectorData: (data: { account?: string; chainId?: bigint }) => void;
  setWallet: (wallet: StarknetWindowObject | null) => void;
  counter: Contract | null;
  account: WalletAccount | null;
  isCounterDeployed: boolean | undefined;
  resyncCounter: () => void;
}>({
  wallet: null,
  connectorData: {},
  setConnectorData: () => {},
  setWallet: () => {},
  counter: null,
  account: null,
  isCounterDeployed: undefined,
  resyncCounter: () => {},
});

export const useWallet = () => {
  return useContext(WalletContext);
};
