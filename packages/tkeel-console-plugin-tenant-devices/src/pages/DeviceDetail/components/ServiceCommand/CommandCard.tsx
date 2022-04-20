import { Flex, HStack, Text } from '@chakra-ui/react';

import {
  DeleteCommandButton,
  UpdateCommandButton,
} from '@tkeel/console-business-components';
import { MoreAction } from '@tkeel/console-components';
import { AppsTwoToneIcon } from '@tkeel/console-icons';
import { CommandItem, CommandValue } from '@tkeel/console-types';

// import { DATA_TYPE_CONFIG } from '../CommandParamModal/DataType';
import CallCommandButton from '../CallCommandButton';

interface Props {
  data: CommandItem;
  uid: string;
  refetch: () => void;
  online: boolean;
  commandValues: CommandValue;
}

export default function CommandCard({
  data,
  uid,
  refetch,
  online,
  commandValues,
}: Props) {
  const { name, id } = data;
  return (
    <Flex
      h="56px"
      w="100%"
      justify="space-between"
      padding="14px 20px"
      bg="white"
      mb="12px"
      lineHeight="24px"
      borderRadius="4px"
      borderWidth="1px"
      borderColor="grayAlternatives.50"
    >
      <HStack spacing="12px" w="35%">
        <AppsTwoToneIcon size="24px" />
        <Text fontSize="14px" fontWeight="600">
          {name}
        </Text>
      </HStack>
      <HStack fontSize="12px" fontWeight="400" spacing="12px" w="35%">
        <Text color="grayAlternatives.400">命令ID</Text>
        <Text>{id}</Text>
      </HStack>
      <HStack spacing="20px">
        <CallCommandButton
          data={data}
          uid={uid}
          online={online}
          commandValues={commandValues}
        />
        <MoreAction
          buttons={[
            <DeleteCommandButton
              key="delete"
              uid={uid}
              data={data}
              refetch={refetch}
            />,
            <UpdateCommandButton
              key="update"
              uid={uid}
              data={data}
              refetch={refetch}
            />,
          ]}
        />
      </HStack>
    </Flex>
  );
}
