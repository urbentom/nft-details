import * as web3 from "@solana/web3.js";
import {
  CandyMachine,
  candyMachineBeet,
} from "@metaplex-foundation/mpl-candy-machine";

export const getAccountDetails = async (
  connection: web3.Connection,
  account: string
): Promise<CandyMachine> => {
  const publicKey = new web3.PublicKey(account);

  const accountDetails = await connection.getAccountInfo(publicKey);

  if (!accountDetails?.data) throw new Error("Account has no data");

  return candyMachineBeet.deserialize(accountDetails?.data, 0)[0];
};
