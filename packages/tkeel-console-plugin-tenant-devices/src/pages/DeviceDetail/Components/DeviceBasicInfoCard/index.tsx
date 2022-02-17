import { ReactNode } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import {
  IconWrapper,
  InfoCardWrapper,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/index.style';

export interface Basic {
  content: string;
  hasIcon: boolean;
  label: string;
  render: () => ReactNode;
}

type Props = {
  isDirectConnection: boolean | undefined;
  basic: Basic[];
};

function DeviceBasicInfoCard({ isDirectConnection, basic }: Props) {
  return (
    <InfoCardWrapper>
      <Text
        fontSize="14px"
        fontWeight={600}
        h="20px"
        lineHeight="20px"
        mb="12px"
      >
        基本信息
      </Text>
      <VStack spacing="4px">
        {basic.map((r) => {
          let contentNode = (
            <Text h="20px" lineHeight="24px" color="gray.800" fontWeight={400}>
              {r.render() || r.content}
            </Text>
          );
          if (r.hasIcon) {
            contentNode = (
              <IconWrapper
                bg={isDirectConnection ? '#EAECF9' : '#FAEBEC'}
                color={isDirectConnection ? '#4257ED' : '#FA7474'}
              >
                {r.render()}
                <Box as="span" ml="4px">
                  {isDirectConnection ? '直连' : '非直连'}
                </Box>
              </IconWrapper>
            );
          }

          return (
            <Flex key={r.label} w="100%" fontSize="12px">
              <Text
                minWidth="48px"
                h="24px"
                lineHeight="24px"
                mr="26px"
                color="grayAlternatives.300"
              >
                {r.label}
              </Text>
              {contentNode}
            </Flex>
          );
        })}
      </VStack>
    </InfoCardWrapper>
  );
}

export default DeviceBasicInfoCard;
