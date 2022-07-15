import React from "react";
import { CandyMachineData } from "../../utils/account";
import {
  Box,
  Heading,
  Input,
  Button,
  Image,
  Text,
  Spinner,
  Flex,
} from "@chakra-ui/react";

interface AccountDetailsViewProps {
  loading: boolean;
  error: Error | undefined;
  data: CandyMachineData | undefined;
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

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box>
        <Heading>Account Details</Heading>
        <Text>Wallet: {props.data?.treasuryWallet ?? ""}</Text>
        <Text>Mint Authority: {props.data?.mintyAuthority ?? ""}</Text>
      </Box>
    </Flex>
  );
};

export default AccountDetailsView;
