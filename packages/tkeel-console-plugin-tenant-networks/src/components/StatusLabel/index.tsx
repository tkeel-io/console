import { Flex, SpinnerProps, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import {
  SuccessFilledIcon,
  WarningFilledIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

interface Props extends SpinnerProps {
  status: string;
  online: string;
  styles?: {
    wrapper?: StyleProps;
  };
}

interface StatusItem {
  label: string;
  icon: ReactNode;
}

interface OnlineItem {
  wifiColor: string;
  wifiIcon: ReactNode;
}

interface StatusInfo {
  enabled: StatusItem;
  disabled: StatusItem;
  offline: StatusItem;
  online: StatusItem;
}
interface OnlineInfo {
  offline: OnlineItem;
  online: OnlineItem;
}

function StatusLabel({ styles, status, online }: Props) {
  const statusInfo: StatusInfo = {
    disabled: {
      label: '已禁用',
      icon: <WarningFilledIcon size={14} color="gray.500" />,
    },
    enabled: {
      label: '已启用',
      icon: <SuccessFilledIcon size={14} color="green.300" />,
    },
    offline: {
      label: '已启用1',
      icon: <SuccessFilledIcon size={14} color="green.300" />,
    },
    online: {
      label: '已启用1',
      icon: <SuccessFilledIcon size={14} color="green.300" />,
    },
  };
  const onlineInfo: OnlineInfo = {
    offline: {
      wifiColor: 'gray.100',
      wifiIcon: <WifiOffFilledIcon size={14} color="gray.500" />,
    },
    online: {
      wifiColor: 'brand.50',
      wifiIcon: <WifiFilledIcon size={14} color="green.300" />,
    },
  };
  const statusObj = statusInfo[status as 'enabled' | 'disabled'];
  const onlineObj = onlineInfo[online as 'online' | 'offline'];
  return (
    <Flex
      flex="1"
      alignItems="center"
      justifyContent="space-between "
      {...styles?.wrapper}
    >
      <Flex alignItems="center">
        {statusObj?.icon ?? ''}
        <Text fontSize="12px" ml="2px" color="gray.600">
          {statusObj?.label ?? ''}
        </Text>
      </Flex>
      <Flex
        bgColor={onlineObj?.wifiColor ?? ''}
        w="24px"
        h="24px"
        borderRadius="4px"
        alignItems="center"
        justifyContent="center"
      >
        {onlineObj?.wifiIcon ?? ''}
      </Flex>
    </Flex>
  );
}

export default StatusLabel;
