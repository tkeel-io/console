import { Flex, SpinnerProps, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { DeviceStatusIcon } from '@tkeel/console-business-components';
import { SuccessFilledIcon, WarningFilledIcon } from '@tkeel/console-icons';

interface Props extends SpinnerProps {
  status: 'enabled' | 'disabled';
  online: boolean;
  styles?: {
    wrapper?: StyleProps;
  };
}

interface StatusItem {
  label: string;
  icon: ReactNode;
}
interface StatusInfo {
  enabled: StatusItem;
  disabled: StatusItem;
}

function StatusLabel({ styles, status, online }: Props) {
  const statusInfo: StatusInfo = {
    disabled: {
      label: '已禁用',
      icon: <WarningFilledIcon size={16} color="gray.500" />,
    },
    enabled: {
      label: '已启用',
      icon: <SuccessFilledIcon size={16} color="green.300" />,
    },
  };
  const statusObj = statusInfo[status];
  return (
    <Flex
      flex="1"
      alignItems="center"
      justifyContent="space-between"
      {...styles?.wrapper}
    >
      <Flex alignItems="center">
        {statusObj?.icon ?? ''}
        <Text fontSize="12px" ml="2px" color="gray.600">
          {statusObj?.label ?? ''}
        </Text>
      </Flex>
      <DeviceStatusIcon isOnline={online} size={16} />
    </Flex>
  );
}

export default StatusLabel;
