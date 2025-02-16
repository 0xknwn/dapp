import { useState } from "react";
import { connect, disconnect } from "starknetkit";
import { InjectedConnector } from "starknetkit/injected";
import { useWallet } from "./wallet_context";

function App() {
  const {
    wallet: cryptoWallet,
    connectorData: cryptoConnectorData,
    setWallet,
    setConnectorData,
  } = useWallet();
  const [count, setCount] = useState(0);

  const connectOrDisconnectWallet = async () => {
    if (cryptoWallet) {
      await disconnect();
      setWallet(null);
      setConnectorData({});
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
      setWallet(wallet);
      setConnectorData(connectorData);
    }
  };
  return (
    <>
      <button onClick={connectOrDisconnectWallet}>
        {cryptoConnectorData?.account ? "Disconnect" : "Connect"}
      </button>
      {cryptoWallet?.name ? (
        <>
          <div>wallet: {cryptoWallet?.name}</div>
          <div>version: {cryptoWallet?.version}</div>
          <div>account: {cryptoConnectorData?.account}</div>
          <div>chain: {cryptoConnectorData?.chainId}</div>
        </>
      ) : (
        <></>
      )}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
