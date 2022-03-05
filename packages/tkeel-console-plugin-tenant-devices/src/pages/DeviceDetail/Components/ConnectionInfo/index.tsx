/* eslint-disable no-underscore-dangle */
import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { ConnectInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';

type Props = {
  data: ConnectInfo;
};

function ConnectionInfo({ data }: Props) {
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
  const [infoData, setInfoData] = useState<ConnectInfo>(connectInfo);
  useEffect(() => {
    setInfoData((preState) => {
      return { ...preState, ...data };
    });
  }, [data]);
  const list = [
    {
      label: '接入协议',
      value: infoData._protocol,
    },
    {
      label: '客户端ID',
      value: infoData._clientId,
    },
    {
      label: '客户端端口',
      value: infoData._sockPort,
    },
    {
      label: '客户端地址',
      value: infoData._peerHost,
    },
    {
      label: '连接时间',
      value: infoData._timestamp
        ? formatDateTimeByTimestamp({
            timestamp: infoData._timestamp,
          })
        : '',
    },
  ];
  return (
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
  );
}

export default ConnectionInfo;
