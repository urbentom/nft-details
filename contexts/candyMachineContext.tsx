import React, { useEffect } from "react";
import * as web3 from "@solana/web3.js";

interface CandyMachineContextProps {
  publicKey: string;
  network: web3.Cluster;
  connection?: web3.Connection;
  setPublicKey: (publicKey: string) => void;
  setNetwork: (network: web3.Cluster) => void;
}

const defaultValue = {
  publicKey: "",
  network: "devnet",
  setPublicKey: (publicKey: string) => console.log("setPublicKey", publicKey),
} as CandyMachineContextProps;

const CandyMachineContext = React.createContext(defaultValue);

const CandyMachineContextProvider = ({ children }) => {
  const [publicKey, setPublicKey] = React.useState(
    "zKfBvqx3w38U28GQVCr8PQ1jDhNTx64cKmCpPU83sje"
  );
  const [network, setNetwork] = React.useState<web3.Cluster>("devnet");
  const [connection, setConnection] = React.useState<web3.Connection>(
    new web3.Connection(web3.clusterApiUrl(network), "confirmed")
  );

  useEffect(() => {
    const connection = new web3.Connection(
      web3.clusterApiUrl(network),
      "confirmed"
    );
    setConnection(connection);
  }, [network]);

  return (
    <CandyMachineContext.Provider
      value={{
        publicKey,
        setPublicKey,
        network,
        setNetwork,
        connection,
      }}
    >
      {children}
    </CandyMachineContext.Provider>
  );
};

export { CandyMachineContext, CandyMachineContextProvider };
export default CandyMachineContext;
