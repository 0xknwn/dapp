import { useState } from "react";
import { connect, disconnect, type StarknetWindowObject } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";

function App() {
  const [count, setCount] = useState(0);
  const [connection, setConnection] = useState(
    null as StarknetWindowObject | null
  );
  const [address, setAddress] = useState(undefined as string | undefined);
  const [chainID, setChainID] = useState(0n as bigint | undefined);

  const connectOrDisconnectWallet = async () => {
    if (connection) {
      await disconnect();
      setConnection(null);
      setAddress(undefined);
      setChainID(undefined);
      return;
    }
    const { wallet, connectorData } = await connect({
      modalMode: "alwaysAsk",
      connectors: [
        new InjectedConnector({ options: { id: "argentX" } }),
        new InjectedConnector({
          options: { id: "braavos" },
        }),
      ],
    });

    if (wallet && connectorData) {
      setConnection(wallet);
      setAddress(connectorData.account);
      setChainID(connectorData?.chainId);
    }
  };
  return (
    <>
      <button onClick={connectOrDisconnectWallet}>
        {connection ? "Disconnect" : "Connect"}
      </button>
      <div>{connection && connection.name}</div>
      <div>{connection && connection.version}</div>
      <div>{address}</div>
      <div>{chainID}</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
