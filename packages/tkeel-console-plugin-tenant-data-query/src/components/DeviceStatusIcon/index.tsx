import { StyleProps } from '@chakra-ui/react';

import { WifiFilledIcon, WifiOffFilledIcon } from '@tkeel/console-icons';

import Rectangle from '../Rectangle';

type Props = {
  isOnline: boolean;
  style?: StyleProps;
};

export default function DeviceStatusIcon({ isOnline, style }: Props) {
  return (
    <Rectangle
      icon={
        isOnline ? (
          <WifiFilledIcon color="green.300" />
        ) : (
          <WifiOffFilledIcon color="gray.500" />
        )
      }
      backgroundColor={isOnline ? 'green.300' : 'gray.500'}
      opacity="0.1"
      style={style}
    />
  );
}
