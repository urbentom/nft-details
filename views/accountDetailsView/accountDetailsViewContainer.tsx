import React, { useContext, useEffect, useState } from "react";
import { CandyMachine } from "@metaplex-foundation/mpl-candy-machine";

// Contexts
import CandyMachineContext from "../../contexts/candyMachineContext";

// View
import AccountDetailsView from "./accountDetailsView";
import { getAccountDetails } from "../../utils/account";

const AccountDetailsViewContainer: React.FC = (props) => {
  const { connection, publicKey } = useContext(CandyMachineContext);
  const [data, setData] = useState<CandyMachine | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!connection) {
      setError(new Error("No connection"));
      return;
    }
    if (!publicKey) return;

    getAccountDetails(connection, publicKey)
      .then((value: CandyMachine) => {
        setData(value);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [connection, publicKey]);

  return <AccountDetailsView {...{ data, error, loading }} />;
};

export default AccountDetailsViewContainer;
