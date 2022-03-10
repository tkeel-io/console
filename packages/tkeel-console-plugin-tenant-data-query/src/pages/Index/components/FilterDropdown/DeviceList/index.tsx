import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
  BoxTwoToneIcon,
  VpcTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

import { Rectangle } from '@/tkeel-console-plugin-tenant-data-query/components';
import { DeviceItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';

import NoData from '../NoData';

type Props = {
  data: DeviceItem[];
};

export default function DeviceList({ data }: Props) {
  const navigate = useNavigate();

  if (data.length === 0) {
    return <NoData />;
  }

  return (
    <Box padding="8px 10px" backgroundColor="gray.50" lineHeight="24px">
      {data.map((device, i) => {
        const { id, properties } = device;
        const { basicInfo, sysField } = properties || {};
        const selfLearn = basicInfo?.selfLearn ?? false;
        const vpcIconColor = selfLearn ? 'primary' : 'gray.500';
        // eslint-disable-next-line no-underscore-dangle
        const isOnline = sysField?._status === 'online' ?? false;

        return (
          <Flex
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            marginBottom={i === data.length - 1 ? '0' : '16px'}
            alignItems="center"
            cursor="pointer"
            onClick={() => {
              navigate(`/detail?id=${id}`);
            }}
          >
            <Flex alignItems="center" flex="1">
              <BoxTwoToneIcon size={18} />
              <Text
                marginLeft="10px"
                color="gray.700"
                fontSize="14px"
                fontWeight="600"
              >
                {basicInfo?.name ?? ''}
              </Text>
            </Flex>
            <Text color="gray.600" fontSize="12px">
              {basicInfo?.parentName ?? ''}
            </Text>
            <Text
              marginLeft="18px"
              width="80px"
              textAlign="right"
              isTruncated
              color="gray.800"
              fontSize="12px"
            >
              {basicInfo?.templateName ?? ''}
            </Text>
            <Flex marginLeft="50px" alignItems="center">
              <Rectangle
                icon={
                  <VpcTwoToneIcon
                    color={vpcIconColor}
                    twoToneColor={vpcIconColor}
                  />
                }
                backgroundColor={selfLearn ? 'primarySub' : 'gray.100'}
              />
              <Rectangle
                icon={
                  isOnline ? (
                    <WifiFilledIcon color="green.300" />
                  ) : (
                    <WifiOffFilledIcon color="gray.500" />
                  )
                }
                backgroundColor={isOnline ? 'green.300' : 'gray.500'}
                opacity="0.1"
                style={{ marginLeft: '8px' }}
              />
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
}
