import { Box, Flex, StyleProps, Text, useDisclosure } from '@chakra-ui/react';

import { IconButton } from '@tkeel/console-components';
import { LoadingCircleFilledIcon } from '@tkeel/console-icons';

import EditSQLModal from '../EditSQLModal';

interface Props {
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function RuleSQL({ sx, styles }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      padding="20px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
      backgroundColor="white"
      {...styles?.root}
      {...sx}
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <LoadingCircleFilledIcon size={22} color="grayAlternatives.300" />
          <Text
            marginLeft="4px"
            color="gray.800"
            fontSize="18px"
            fontWeight="600"
          >
            规则转换
          </Text>
        </Flex>
        <IconButton
          icon={<LoadingCircleFilledIcon color="white" />}
          padding="0 10px"
          backgroundColor="gray.700"
          boxShadow="none"
          _hover={{ backgroundColor: 'gray.700' }}
          onClick={() => onOpen()}
        >
          编写SQL
        </IconButton>
        <EditSQLModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
}