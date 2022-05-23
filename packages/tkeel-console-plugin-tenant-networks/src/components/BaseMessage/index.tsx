import { Box, Flex, StyleProps } from '@chakra-ui/react';

import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

interface Props {
  baseMsg: {
    ip: string;
    token: string;
    time: string;
  };
  styles?: {
    wrapper?: StyleProps;
    name?: StyleProps;
  };
}

function BaseMessage({ baseMsg, styles }: Props) {
  const { ip, token, time } = baseMsg;
  const baseKeyValue = [
    { name: '客户端地址', value: ip },
    {
      name: '认证 TOKEN',
      value: `${token.slice(0, 4)}********${token.slice(-4, token.length)}`,
    },
    {
      name: '创建时间',
      value: formatDateTimeByTimestamp({
        timestamp: `${time}`,
      }),
    },
  ];
  return (
    <Box>
      {baseKeyValue.map((item, idx) => {
        return (
          <Flex key={String(idx + 1)} {...styles?.wrapper}>
            <Box
              color="grayAlternatives.300"
              fontSize="12px"
              lineHeight="20px"
              {...styles?.name}
            >
              {item.name}
            </Box>
            <Box color="gray.800" fontSize="12px" lineHeight="20px">
              {item.value}
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}

export default BaseMessage;
