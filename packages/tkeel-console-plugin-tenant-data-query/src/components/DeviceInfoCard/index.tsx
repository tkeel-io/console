import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { DeviceStatusIcon } from '@tkeel/console-business-components';
import { DeviceItem } from '@tkeel/console-request-hooks';

import DeviceIconName from '../DeviceIconName';

type Props = {
  device: DeviceItem;
  style?: StyleProps;
};

export default function DeviceInfoCard({ device, style }: Props) {
  const navigate = useNavigate();
  const { pathname, search } = window.location;
  const { id, properties } = device;
  const { basicInfo, connectInfo } = properties || {};
  // eslint-disable-next-line no-underscore-dangle
  const isOnline = connectInfo?._online ?? false;
  const infos = [
    {
      label: 'ID',
      value: id || '',
    },
    {
      label: '分组',
      value: basicInfo?.parentName ?? '',
    },
    {
      label: '模板',
      value: basicInfo?.templateName ?? '',
    },
  ];

  const fromUrl = encodeURIComponent(`${pathname}${search}`);
  return (
    <Flex
      flexDirection="column"
      height="152px"
      border="1px solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
      backgroundColor="white"
      cursor="pointer"
      {...style}
      onClick={() =>
        navigate(
          // eslint-disable-next-line sonarjs/no-nested-template-literals
          `/detail?id=${id}&from-url=${fromUrl}&menu-collapsed=true`
        )
      }
    >
      <Flex height="48px" padding="16px 20px 0" justifyContent="space-between">
        <DeviceIconName name={basicInfo?.name ?? ''} />
        <DeviceStatusIcon isOnline={isOnline} />
      </Flex>
      <Flex
        padding="0 20px"
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
            <Text flexBasis="48px" color="grayAlternatives.300">
              {info.label}：
            </Text>
            <Text color="gray.700" isTruncated title={info.value}>
              {info.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
