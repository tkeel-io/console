import { Box, Flex, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { DnsAliasesTowToneIcon } from '@tkeel/console-icons';

import BaseBox from '@/tkeel-console-plugin-admin-usage-statistics/components/BaseBox';

interface Props {
  title: string;
  children: ReactNode;
}

export default function MessageSubscriptionBox({ title, children }: Props) {
  return (
    <BaseBox sx={{ flex: '1' }}>
      <Flex height="56px" padding="14px 22px" backgroundColor="gray.50">
        <DnsAliasesTowToneIcon size="28px" />
        <Text
          paddingLeft="10px"
          fontWeight="600"
          fontSize="14px"
          lineHeight="32px"
          color="gray.800"
        >
          {title}
        </Text>
      </Flex>
      <Box height="184px" padding="18px 30px 10px 0">
        {children}
      </Box>
    </BaseBox>
  );
}
