import { Box } from '@chakra-ui/react';

export const CONNECT_TYPE_INFO_MAP = {
  upstream: {
    title: '上行',
    bg: 'purple.50',
    color: 'purple.600',
  },
  downstream: {
    title: '下行',
    bg: 'orange.50',
    color: 'orange.400',
  },
  connecting: {
    title: '连接',
    bg: 'blue.50',
    color: 'blue.300',
  },
};

type ConnectTypeInfo = {
  title: string;
  bg: string;
  color: string;
};

export type ConnectType = 'upstream' | 'downstream' | 'connecting';

type Props = {
  connectType: ConnectType;
};

export default function RawDataConnectTypeLabel({ connectType }: Props) {
  const connectTypeInfo = CONNECT_TYPE_INFO_MAP[connectType] as ConnectTypeInfo;
  return (
    <Box
      bg={connectTypeInfo?.bg}
      color={connectTypeInfo?.color}
      w="42px"
      h="24px"
      textAlign="center"
      borderRadius="2px"
      fontWeight="600"
      lineHeight="2"
    >
      {connectTypeInfo?.title ?? ''}
    </Box>
  );
}
