import { useEffect, useState } from "react";
import WalletButton from "./wallet_button";
import { useWallet } from "./wallet_context";
import { num } from "starknet";
function App() {
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const { isCounterDeployed, counter, account } = useWallet();
  useEffect(() => {
    const fetchCounter = async () => {
      if (!counter || !account) {
        setCount(0);
        return;
      }
      const call = counter.populate("get", {});
      const result = await account.callContract(call, "pending");
      setCount(Number(num.toBigInt(result[0])));
    };
    fetchCounter();
  }, [counter, account, refresh]);

  const increment = async () => {
    if (!counter || !account) {
      return;
    }
    try {
      const call = counter.populate("increment", {});
      const { transaction_hash } = await account.execute(call);
      console.log(transaction_hash);
      await account.waitForTransaction(transaction_hash);
      setRefresh((r) => r + 1);
    } catch (e) {
      console.error(e);
    }
  };

  const reset = async () => {
    if (!counter || !account) {
      return;
    }
    try {
      const call = counter.populate("reset", {});
      const { transaction_hash } = await account.execute(call);
      console.log(transaction_hash);
      await account.waitForTransaction(transaction_hash);
      setRefresh((r) => r + 1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <WalletButton />
      <div className="card">
        {isCounterDeployed ? (
          <>
            <button onClick={increment}>increment</button>
            <button onClick={reset}>reset</button>
          </>
        ) : (
          <div>Counter is not deployed or we could not get its status.</div>
        )}
        <div>Counter value is: {count}</div>
      </div>
    </>
  );
}

export default App;
