import { Box } from '@chakra-ui/react';

const CONNECT_TYPE_INFO_MAP = {
  upstream: {
    desc: '上行',
    bg: 'purple.50',
    color: 'purple.600',
  },
  downstream: {
    desc: '下行',
    bg: 'orange.50',
    color: 'orange.400',
  },
  connecting: {
    desc: '连接',
    bg: 'blue.50',
    color: 'blue.300',
  },
};

type Props = {
  connectType: 'upstream' | 'downstream' | 'connecting';
};

export default function RawDataConnectTypeLabel({ connectType }: Props) {
  const connectTypeInfo = CONNECT_TYPE_INFO_MAP[connectType];
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
      {connectTypeInfo?.desc ?? ''}
    </Box>
  );
}
