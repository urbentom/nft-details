import * as web3 from "@solana/web3.js";
import dayjs from "dayjs";
import { candyMachineBeet } from "@metaplex-foundation/mpl-candy-machine";

export type CandyMachineData = {
  uuid: string;
  price: number;
  itemsAvailable: number;
  maxSupply: number;
  goLiveDate: string;
  creators: Creator[];
  isMutable: boolean;
  endSettings: any;
  gatekeeper: any;
  hiddenSettings: any;
  whitelistMintSettings: any;
  symbol: string;
  retainAuthority: boolean;
  sellerFeeBasisPoints: number;
  mintyAuthority: string;
  treasuryWallet: string;
};

type Creator = {
  address: string;
  verified: boolean;
  share: number;
};

export const getAccountDetails = async (
  connection: web3.Connection,
  account: string
): Promise<CandyMachineData> => {
  const publicKey = new web3.PublicKey(account);

  const accountDetails = await connection.getAccountInfo(publicKey);

  if (!accountDetails?.data) throw new Error("Account has no data");

  const candyMachine = candyMachineBeet.deserialize(accountDetails?.data, 0)[0];

  const prettierCandyMachine = candyMachine.pretty();

  const data: CandyMachineData = {
    ...candyMachine.data,
    price: candyMachine.data.price.toNumber(),
    itemsAvailable: candyMachine.data.itemsAvailable.toNumber(),
    maxSupply: candyMachine.data.maxSupply.toNumber(),
    goLiveDate: dayjs
      .unix(candyMachine.data.goLiveDate.toString())
      .format("DD/MM/YYYY"),
    creators: candyMachine.data.creators.map((creator) => {
      return {
        ...creator,
        address: creator.address.toString(),
      };
    }),
    mintyAuthority: prettierCandyMachine.authority,
    treasuryWallet: prettierCandyMachine.wallet,
  };

  return data;
};
