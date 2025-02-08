import { useState } from "react";
import { injectSmartr, injectUI } from "@0xknwn/connect-core";
import Loader from "./Loader";
import feedback from "./feedback";

interface Window {
  starknet_smartr: {
    sendMessage: (
      application: string,
      domain: string,
      contractAddress: string,
      entrypoint: string,
      calldata: string[]
    ) => Promise<void>;
  };
}

injectUI({
  i: 2,
  update: (i: number) => {
    console.log("i:", i);
    feedback(i);
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Dapp</h1>
      <Loader
        counterAddress="0x2ae7a2b0ede9a997e2d53e2b99f67877ac68e8de4266f30706b24bd6cd53190"
        refresh={(i: number) => {
          console.log("refresh");
          setCount(i);
        }}
      />
      <div className="card">
        <div>current counter value is {count}</div>

        <button
          onClick={() => {
            (window as Window).starknet_smartr?.sendMessage(
              "0x0",
              "localhost:3000",
              "0x2ae7a2b0ede9a997e2d53e2b99f67877ac68e8de4266f30706b24bd6cd53190",
              "increment",
              []
            );
          }}
        >
          Increment
        </button>
      </div>
    </>
  );
}

export default App;
