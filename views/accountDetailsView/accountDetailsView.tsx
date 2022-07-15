import React from "react";
import { CandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import beet from "@metaplex-foundation/beet";
import {
  Box,
  Heading,
  Input,
  Button,
  Image,
  Spinner,
  Flex,
} from "@chakra-ui/react";

interface AccountDetailsViewProps {
  loading: boolean;
  error: Error | undefined;
  data: CandyMachine | undefined;
}

const AccountDetailsView: React.FC<AccountDetailsViewProps> = (props) => {
  if (props.loading)
    return (
      <Flex justifyContent="center" alignItems="center">
        <Heading>Loading</Heading>
        <Spinner size="xl" />
      </Flex>
    );
  if (props.error)
    return (
      <Flex justifyContent="center" alignItems="center">
        <Heading>Error</Heading>
      </Flex>
    );

  console.log("data", props.data?.pretty());
  console.log("Price", beet.i256.read(props.data?.data.price, 0));
  return <Flex justifyContent="center" alignItems="center"></Flex>;
};

export default AccountDetailsView;
