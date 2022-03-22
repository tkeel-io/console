import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { MethodIcon } from '@tkeel/console-icons';

import StatusLabel from '@/tkeel-console-plugin-tenant-routing-rules/components/StatusLabel';

type Props = {
  briefInfo: {
    name: string;
    desc?: string;
    status: number;
  };
  operatorButton: ReactNode;
  bottomInfo: ReactNode;
  onClick: () => unknown;
};

function RouteRulesCard({
  briefInfo,
  operatorButton,
  bottomInfo,
  onClick,
}: Props) {
  return (
    <Flex
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      backgroundColor="white"
      cursor="pointer"
      _hover={{
        boxShadow: '0px 4px 8px rgba(113, 128, 150, 0.1)',
      }}
      onClick={onClick}
    >
      <Box bgColor="gray.50" padding="16px 24px 12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box flexShrink="0">
              <MethodIcon size={28} />
            </Box>
            <Text
              marginLeft="12px"
              color="gray.800"
              fontSize="14px"
              fontWeight="600"
            >
              {briefInfo?.name ?? ''}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <StatusLabel
              styles={{ wrapper: { mr: '12px' } }}
              status={briefInfo.status}
            />
            {operatorButton}
          </Flex>
        </Flex>
        <Text color="gray.500" fontSize="12px" lineHeight="30px">
          {briefInfo?.desc ?? ''}
        </Text>
      </Box>
      <Box padding="16px 24px">{bottomInfo}</Box>
    </Flex>
  );
}

export default RouteRulesCard;
