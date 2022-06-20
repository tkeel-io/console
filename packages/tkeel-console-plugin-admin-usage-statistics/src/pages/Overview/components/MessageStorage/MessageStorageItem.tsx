import type { StyleProps } from '@chakra-ui/react';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { ChainFilledIcon } from '@tkeel/console-icons';

interface Props {
  title: string;
  children: ReactNode;
  sx?: StyleProps;
}

export default function MessageStorageItem({ title, children, sx }: Props) {
  return (
    <Box flex="1" height="140px" {...sx}>
      <Flex alignItems="center" paddingBottom="16px">
        <ChainFilledIcon size="16px" color="primary" />
        <Text paddingLeft="8px">{title}</Text>
      </Flex>
      {children}
    </Box>
  );
}
