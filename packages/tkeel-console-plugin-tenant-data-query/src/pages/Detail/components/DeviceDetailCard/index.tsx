import { Box, Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';
import { VpcTwoToneIcon } from '@tkeel/console-icons';

import {
  DeviceIconName,
  DeviceStatusIcon,
  Rectangle,
} from '@/tkeel-console-plugin-tenant-data-query/components';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

export default function DeviceDetailCard() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { deviceObject } = useDeviceDetailQuery({ id });
  const { properties } = deviceObject || {};
  const { basicInfo, sysField } = properties || {};
  const isSelfLearn = basicInfo?.selfLearn;
  const textStyle = {
    color: 'gray.800',
    fontSize: '12px',
    lineHeight: '24px',
  };

  const vpcIconBg = isSelfLearn ? 'primarySub' : 'gray.100';

  const vpcIconColors = isSelfLearn
    ? {
        color: 'primary',
        twoToneColor: 'primary',
      }
    : {
        color: 'gray.500',
        twoToneColor: 'gray.500',
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
            window.history.back();
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
              isOnline={
                // eslint-disable-next-line no-underscore-dangle
                sysField?._status === 'online'
              }
            />
            <Rectangle
              icon={
                <VpcTwoToneIcon
                  color={vpcIconColors.color}
                  twoToneColor={vpcIconColors.twoToneColor}
                />
              }
              backgroundColor={vpcIconBg}
              style={{ marginLeft: '8px' }}
            />
          </Flex>
        </Flex>
      </Box>
      <Flex
        padding="0 20px"
        justifyContent="space-between"
        alignItems="center"
        height="48px"
      >
        <Text {...textStyle}>IDC分组1</Text>
        <Text {...textStyle}>SIC电表</Text>
      </Flex>
    </Box>
  );
}
