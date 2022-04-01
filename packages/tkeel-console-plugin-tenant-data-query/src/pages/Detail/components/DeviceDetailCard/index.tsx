import { Box, Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import {
  DeviceStatusIcon,
  SelfLearnIcon,
} from '@tkeel/console-business-components';
import { BackButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import { DeviceIconName } from '@/tkeel-console-plugin-tenant-data-query/components';
import { DeviceObject } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

type Props = {
  detailData: DeviceObject | undefined;
};

export default function DeviceDetailCard({ detailData }: Props) {
  const portalProps = plugin.getPortalProps();
  const { navigate } = portalProps.client;
  const [searchParams] = useSearchParams();
  const { properties } = detailData || {};
  const { basicInfo, connectInfo } = properties || {};
  // eslint-disable-next-line no-underscore-dangle
  const isOnline = connectInfo?._online ?? false;
  const isSelfLearn = basicInfo?.selfLearn ?? false;
  const textStyle = {
    color: 'gray.800',
    fontSize: '12px',
    lineHeight: '24px',
  };

  return (
    <Box borderRadius="4px" backgroundColor="white">
      <Box
        padding="12px 20px 12px 12px"
        height="92px"
        backgroundColor="gray.50"
      >
        <BackButton
          onClick={() => {
            const url = searchParams.get('from-url') || '/tenant-data-query';
            navigate(url);
          }}
        />
        <Flex
          marginTop="12px"
          paddingLeft="8px"
          justifyContent="space-between"
          alignItems="center"
        >
          <DeviceIconName name={basicInfo?.name ?? ''} />
          <Flex>
            <DeviceStatusIcon
              isOnline={isOnline}
              styles={{ wrapper: { marginRight: '8px' } }}
            />
            <SelfLearnIcon isSelfLearn={isSelfLearn} />
          </Flex>
        </Flex>
      </Box>
      <Flex
        padding="0 20px"
        justifyContent="space-between"
        alignItems="center"
        height="48px"
      >
        <Text {...textStyle}>{basicInfo?.parentName ?? ''}</Text>
        <Text {...textStyle}>{basicInfo?.templateName ?? ''}</Text>
      </Flex>
    </Box>
  );
}
