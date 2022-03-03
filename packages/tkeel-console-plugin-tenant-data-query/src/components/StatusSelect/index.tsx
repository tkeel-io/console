import { Flex, Text, useDisclosure } from '@chakra-ui/react';

import { MoreAction, MoreActionButton } from '@tkeel/console-components';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

export interface Status {
  label: string;
  value: string;
}

export interface StatusSelectProps {
  status: Status;
  onStatusChange: (status: Status) => unknown;
  canHover?: boolean;
}

export default function StatusSelect({
  status,
  onStatusChange,
  canHover = true,
}: StatusSelectProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonInfoList = [
    {
      key: 'all',
      title: '全部状态',
      icon: null,
    },
    {
      key: 'online',
      title: '在线',
      icon: <WifiFilledIcon color="green.300" />,
    },
    {
      key: 'offline',
      title: '离线',
      icon: <WifiOffFilledIcon color="gray.500" />,
    },
  ];

  const buttons = buttonInfoList.map((info) => (
    <MoreActionButton
      key={info.key}
      title={info.title}
      icon={info.icon}
      onClick={() => onStatusChange({ label: info.title, value: info.key })}
    />
  ));

  const backgroundColorStyle = canHover
    ? {
        backgroundColor: isOpen ? 'gray.100' : 'transparent',
        _hover: { backgroundColor: 'gray.100' },
      }
    : {
        backgroundColor: 'white',
      };
  return (
    <MoreAction
      element={
        <Flex
          padding="0 10px"
          alignItems="center"
          height="32px"
          borderRadius="16px"
          cursor="pointer"
          {...backgroundColorStyle}
        >
          <Text marginRight="6px" color="gray.700" fontSize="12px">
            {status.label}
          </Text>
          {isOpen ? (
            <ChevronUpFilledIcon color="grayAlternatives.300" />
          ) : (
            <ChevronDownFilledIcon color="grayAlternatives.300" />
          )}
        </Flex>
      }
      buttons={buttons}
      isActionListOpen={isOpen}
      onActionListOpen={onOpen}
      onActionListClose={onClose}
    />
  );
}
