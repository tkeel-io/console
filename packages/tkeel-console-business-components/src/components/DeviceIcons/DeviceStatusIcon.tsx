import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { WifiFilledIcon, WifiOffFilledIcon } from '@tkeel/console-icons';

import IconTooltip from './IconTooltip';
import IconWrapper from './IconWrapper';

type Props = {
  isOnline: boolean;
  isShowTooltip?: boolean;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function StatusIcon({
  isOnline,
  isShowTooltip = true,
  styles,
}: Props) {
  let label: ReactNode = '';
  if (isShowTooltip) {
    label = (
      <Flex>
        设备
        {isOnline ? (
          <Text color="green.50">在线</Text>
        ) : (
          <Text color="gray.500">离线</Text>
        )}
      </Flex>
    );
  }
  return (
    <Box {...styles?.wrapper}>
      <IconTooltip label={label}>
        <IconWrapper bg={isOnline ? 'green.50' : 'gray.100'}>
          {isOnline ? (
            <WifiFilledIcon color="green.300" size="20px" />
          ) : (
            <WifiOffFilledIcon color="gray.500" size="20px" />
          )}
        </IconWrapper>
      </IconTooltip>
    </Box>
  );
}
