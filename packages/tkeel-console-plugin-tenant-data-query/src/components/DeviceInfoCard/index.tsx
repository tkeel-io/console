import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import DeviceIconName from '../DeviceIconName';
import DeviceStatusIcon from '../DeviceStatusIcon';

type Props = {
  style?: StyleProps;
};

export default function DeviceInfoCard({ style }: Props) {
  const navigate = useNavigate();
  const infos = [
    {
      label: 'ID',
      value: 'OIE9009',
    },
    {
      label: '分组',
      value: '默认分组/自定义分组2/ISV分组02',
    },
    {
      label: '模板',
      value: 'SIC电表',
    },
  ];

  return (
    <Flex
      flexDirection="column"
      border="1px solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
      backgroundColor="white"
      cursor="pointer"
      {...style}
      onClick={() => navigate('/detail')}
    >
      <Flex
        height="48px"
        padding="16px 20px 0"
        justifyContent="space-between"
        // alignItems="center"
      >
        <DeviceIconName />
        <DeviceStatusIcon isOnline />
      </Flex>
      <Flex
        paddingLeft="20px"
        flexDirection="column"
        justifyContent="center"
        height="104px"
        backgroundColor="gray.50"
      >
        {infos.map((info) => (
          <Flex
            key={info.label}
            alignItems="center"
            lineHeight="28px"
            fontSize="12px"
          >
            <Text width="48px" color="grayAlternatives.300">
              {info.label}：
            </Text>
            <Text color="gray.700" isTruncated>
              {info.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
