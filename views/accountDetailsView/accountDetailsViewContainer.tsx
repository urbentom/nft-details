import React, { useContext, useEffect, useState } from "react";

// Contexts
import CandyMachineContext from "../../contexts/candyMachineContext";

// View
import AccountDetailsView from "./accountDetailsView";
import { getAccountDetails, CandyMachineData } from "../../utils/account";

const AccountDetailsViewContainer: React.FC = (props) => {
  const { connection, publicKey } = useContext(CandyMachineContext);
  const [data, setData] = useState<CandyMachineData | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!connection) {
      setError(new Error("No connection"));
      return;
    }
    if (!publicKey) return;

    getAccountDetails(connection, publicKey)
      .then((value: CandyMachineData) => {
        setData(value);
      })
      .catch((err) => {
        console.log("Error getting account details", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [connection, publicKey]);

  return <AccountDetailsView {...{ data, error, loading }} />;
};

export default AccountDetailsViewContainer;
