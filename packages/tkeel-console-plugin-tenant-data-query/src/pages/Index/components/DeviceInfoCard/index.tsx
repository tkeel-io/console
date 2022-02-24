import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { WebcamTwoToneIcon } from '@tkeel/console-icons';

import Rectangle from '../Rectangle';

type Props = {
  style: StyleProps;
};

export default function DeviceInfoCard({ style }: Props) {
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
      {...style}
    >
      <Flex
        height="48px"
        padding="16px 20px 0"
        justifyContent="space-between"
        // alignItems="center"
      >
        <Flex height="24px" alignItems="center">
          <WebcamTwoToneIcon />
          <Text
            marginLeft="10px"
            color="gray.700"
            fontSize="14px"
            fontWeight="600"
            lineHeight="24px"
          >
            OPC协议设备
          </Text>
        </Flex>
        <Rectangle backgroundColor="green.300" opacity="0.1" />
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
