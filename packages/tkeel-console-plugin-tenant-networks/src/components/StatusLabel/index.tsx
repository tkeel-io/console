import { Flex, SpinnerProps, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import {
  SuccessFilledIcon,
  WarningFilledIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

interface Props extends SpinnerProps {
  status: number;
  styles?: {
    wrapper?: StyleProps;
  };
}

type StatusItem = {
  label: string;
  icon: ReactNode;
  wifiColor: string;
  wifiIcon: ReactNode;
};

type StatusInfo = StatusItem[];

function StatusLabel({ styles, status }: Props) {
  const statusInfo: StatusInfo = [
    {
      label: '已禁用',
      icon: <WarningFilledIcon size={14} color="gray.500" />,
      wifiColor: 'gray.100',
      wifiIcon: <WifiOffFilledIcon size={14} color="gray.500" />,
    },
    {
      label: '已启用',
      icon: <SuccessFilledIcon size={14} color="green.300" />,
      wifiColor: 'brand.50',
      wifiIcon: <WifiFilledIcon size={14} color="green.300" />,
    },
  ];
  return (
    <Flex
      flex="1"
      alignItems="center"
      justifyContent="space-between "
      {...styles?.wrapper}
    >
      <Flex alignItems="center">
        {statusInfo[status]?.icon}
        <Text fontSize="12px" ml="2px">
          {statusInfo[status]?.label}
        </Text>
      </Flex>
      <Flex
        bgColor={statusInfo[status]?.wifiColor}
        w="24px"
        h="24px"
        borderRadius="4px"
        alignItems="center"
        justifyContent="center"
      >
        {statusInfo[status]?.wifiIcon}
      </Flex>
    </Flex>
  );
}

export default StatusLabel;
