import { useState, useEffect } from "react";
import { Contract, RpcProvider } from "starknet";
import { CounterABI } from "@0xknwn/starknet-test-helpers";

export type LoaderProps = {
  counterAddress: string;
  refresh: (count: number) => void;
};

const Loader = ({ counterAddress, refresh }: LoaderProps) => {
  const [autoRefresh, setAutoRefresh] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoRefresh(autoRefresh + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [counterAddress, autoRefresh, refresh]);

  useEffect(() => {
    if (autoRefresh % 10 !== 2) {
      return;
    }
    const counterValue = async () => {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const provider = new RpcProvider({ nodeUrl: `${baseUrl}/rpc` });
      const counter = new Contract(CounterABI, counterAddress, provider);
      refresh(Number(await counter.get()));
    };
    counterValue();
  }, [autoRefresh]);

  return <></>;
};

export default Loader;
