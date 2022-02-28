import { Box, Flex, Text } from '@chakra-ui/react';

import {
  BoxTwoToneIcon,
  VpcTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

import { Rectangle } from '@/tkeel-console-plugin-tenant-data-query/components';
import { DeviceItem } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceListQuery';

type Props = {
  data: DeviceItem[];
};

export default function DeviceList({ data }: Props) {
  // eslint-disable-next-line no-console
  console.log('DeviceList ~ data', data);
  return (
    <Box padding="8px 10px" backgroundColor="gray.50" lineHeight="24px">
      {data.map((device, i) => {
        const { basicInfo, connectInfo } = device?.properties ?? {};
        const selfLearn = basicInfo?.selfLearn ?? false;
        const vpcIconColor = selfLearn ? 'primary' : 'gray.500';
        // eslint-disable-next-line no-underscore-dangle
        const isOnline = connectInfo?._online ?? false;

        return (
          <Flex
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            marginBottom={i === data.length - 1 ? '0' : '16px'}
            alignItems="center"
            cursor="pointer"
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
            <Text marginLeft="18px" color="gray.800" fontSize="12px">
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
