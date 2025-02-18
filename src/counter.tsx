import { useState, useEffect } from "react";
import { RpcProvider } from "starknet";
import { useWallet } from "./wallet_context";

import {
  classNames,
  classHash as snClassHash,
} from "@0xknwn/starknet-contracts";
import { deployCounter } from "@0xknwn/starknet-test-helpers";

const Declare = () => {
  const { account, counter, isCounterDeployed, resyncCounter } = useWallet();

  const counterClassHash = snClassHash(classNames.Counter);
  const [isDeclared, setIsDeclared] = useState(
    undefined as boolean | undefined
  );
  const [deployingStatus, setDeployingStatus] = useState("notstarted");

  useEffect(() => {
    if (counterClassHash === "0x0") {
      return;
    }
    const fetchDeclaredStatus = async () => {
      const provider = new RpcProvider({
        nodeUrl: window.location.origin + "/api/sepolia",
      });
      try {
        const d = await provider.getClassByHash(counterClassHash);
        if (d) {
          setIsDeclared(true);
          return;
        }
        setIsDeclared(false);
      } catch {
        setIsDeclared(false);
      }
    };
    fetchDeclaredStatus();
  });

  const deploy = async () => {
    if (!account || !account?.address || account?.address === "0x0") {
      return;
    }
    setDeployingStatus("deploying");
    try {
      await deployCounter(account, account.address, {
        version: 3,
      });
      resyncCounter();
    } catch (e) {
      setDeployingStatus("error");
    }
  };

  return (
    <>
      {account?.address ? (
        <>
          <h2>Counter</h2>
          <div>
            <div>class hash: {counterClassHash}</div>
            <div>is declared: {isDeclared ? "yes" : "no"}</div>
            <div>Counter Address: {counter?.address}</div>
            {isCounterDeployed ? (
              <div>Counter is already deployed</div>
            ) : deployingStatus === "notstarted" ? (
              <div>
                <button onClick={deploy}>Deploy</button>
              </div>
            ) : deployingStatus === "deploying" ? (
              <div>Deploying...</div>
            ) : (
              <div>Deployment failed</div>
            )}
          </div>
        </>
      ) : (
        <p>please connect wallet</p>
      )}
    </>
  );
};

export default Declare;
