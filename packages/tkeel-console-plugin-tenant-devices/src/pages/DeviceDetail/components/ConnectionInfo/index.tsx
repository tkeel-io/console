import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { ConnectInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import CustomEmpty from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/CustomEmpty';

type Props = {
  data: ConnectInfo;
};

const connectInfo = {
  _clientId: '',
  _online: false,
  _owner: '',
  _peerHost: '',
  _protocol: '',
  _timestamp: '',
  _sockPort: '',
  _userName: '',
} as const;

function ConnectionInfo({ data }: Props) {
  const [infoData, setInfoData] = useState<ConnectInfo>(connectInfo);
  useEffect(() => {
    setInfoData((preState) => {
      return { ...preState, ...data };
    });
  }, [data]);
  const list = [
    {
      label: '接入协议',
      // eslint-disable-next-line no-underscore-dangle
      value: infoData._protocol,
    },
    {
      label: '客户端ID',
      // eslint-disable-next-line no-underscore-dangle
      value: infoData._clientId,
    },
    {
      label: '客户端端口',
      // eslint-disable-next-line no-underscore-dangle
      value: infoData._sockPort,
    },
    {
      label: '客户端地址',
      // eslint-disable-next-line no-underscore-dangle
      value: infoData._peerHost,
    },
    {
      label: '连接时间',
      // eslint-disable-next-line no-underscore-dangle
      value: infoData._timestamp
        ? formatDateTimeByTimestamp({
            // eslint-disable-next-line no-underscore-dangle
            timestamp: infoData._timestamp,
          })
        : '',
    },
  ];
  // eslint-disable-next-line no-underscore-dangle
  return infoData?._online ? (
    <Box>
      <Text
        fontSize="14px"
        fontWeight="600"
        h="32px"
        lineHeight="32px"
        mb="12px"
      >
        连接信息
      </Text>
      <Box bg="gray.50" borderRadius="4px" p="12px 12px" w="100%">
        <Flex
          flexWrap="wrap"
          bg="white"
          border="1px"
          borderColor="gray.100"
          borderRadius="4px"
          p="8px 20px 12px"
        >
          {list.map((r) => {
            return (
              <Box
                fontSize="12px"
                key={r.label}
                m="0 12px 12px 0"
                minWidth="150px"
              >
                <Text color="grayAlternatives.300">{r.label}</Text>
                <Text color="gray.700">{r.value}</Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  ) : (
    <CustomEmpty />
  );
}

export default ConnectionInfo;
