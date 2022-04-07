import { Button, Flex, HStack, Text } from '@chakra-ui/react';

import { AppsTwoToneIcon, CaretRightFilledIcon } from '@tkeel/console-icons';
import { CommandItem } from '@tkeel/console-types';

interface Props {
  data: CommandItem;
}

export default function CommandCard({ data }: Props) {
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
      <HStack spacing="12px">
        <AppsTwoToneIcon size="24px" />
        <Text fontSize="14px" fontWeight="600">
          {name}
        </Text>
      </HStack>
      <HStack fontSize="12px" fontWeight="400" spacing="12px">
        <Text color="grayAlternatives.400">命令ID</Text>
        <Text>{id}</Text>
      </HStack>
      <HStack fontSize="12px" fontWeight="400" spacing="12px">
        <Text color="grayAlternatives.400">调用次数</Text>
        <Text color="grayAlternatives.400" fontWeight="400">
          <Text
            as="b"
            fontSize="14px"
            fontWeight="700"
            mr="4px"
            color="gray.800"
          >
            {1}
          </Text>
          次
        </Text>
      </HStack>
      <Button
        p="6px 12px 6px 8px"
        borderRadius="4px"
        borderColor="primary"
        borderStyle="solid"
        boxShadow="none"
        bg="primarySub"
        borderWidth="1px"
        h="28px"
        fontSize="12px"
        color="primary"
        leftIcon={<CaretRightFilledIcon color="primary" />}
        _hover={{ background: 'primarySub' }}
        _active={{ background: 'primarySub' }}
      >
        调用
      </Button>
    </Flex>
  );
}
