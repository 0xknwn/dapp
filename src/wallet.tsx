import { useEffect } from "react";
import { WalletContext } from "./wallet_context";
import { type StarknetWindowObject } from "starknetkit";
import { useState } from "react";
import { Contract, WalletAccount, RpcProvider } from "starknet";
type WalletProviderProps = {
  children: React.ReactNode;
};
import {
  counterAddress as computeCounterAddress,
  Counter,
} from "@0xknwn/starknet-test-helpers";

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState(null as StarknetWindowObject | null);
  const [connectorData, setConnectorData] = useState(
    {} as { account?: string; chainId?: bigint }
  );
  const [counter, setCounter] = useState<Contract | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [isCounterDeployed, setIsCounterDeployed] = useState(
    undefined as boolean | undefined
  );
  const [account, setAccount] = useState<WalletAccount | null>(null);

  const resyncCounter = () => {
    setRefresh((r) => r + 1);
  };

  useEffect(() => {
    const fetchAccount = async (swo: StarknetWindowObject) => {
      const url = window.location.origin + "/api/sepolia";
      const provider = new RpcProvider({ nodeUrl: url });
      const account = await WalletAccount.connect(provider, swo);
      setAccount(account);
    };
    if (wallet?.name) {
      fetchAccount(wallet);
    } else {
      setAccount(null);
    }
  }, [wallet]);

  useEffect(() => {
    if (!account || !account?.address || account?.address === "0x0") {
      setCounter(null);
      return;
    }
    const fetchCounter = async () => {
      const counterAddress = await computeCounterAddress(
        account.address,
        account.address
      );
      setCounter(new Counter(counterAddress, account));
    };
    fetchCounter();
  }, [account]);

  useEffect(() => {
    if (!counter || !counter.address) {
      setIsCounterDeployed(undefined);
      return;
    }
    const fetchDeclaredStatus = async () => {
      const provider = new RpcProvider({
        nodeUrl: window.location.origin + "/api/sepolia",
      });
      try {
        const d = await provider.getClassHashAt(counter.address);
        if (d) {
          setIsCounterDeployed(true);
          return;
        }
        setIsCounterDeployed(false);
      } catch {
        setIsCounterDeployed(false);
      }
    };
    fetchDeclaredStatus();
  }, [counter, refresh]);

  const value = {
    wallet,
    connectorData,
    setWallet,
    setConnectorData,
    counter,
    account,
    isCounterDeployed,
    resyncCounter,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
