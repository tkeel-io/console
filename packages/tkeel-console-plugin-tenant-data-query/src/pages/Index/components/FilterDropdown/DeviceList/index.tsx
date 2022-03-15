import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
  DeviceStatusIcon,
  SelfLearnIcon,
} from '@tkeel/console-business-components';
import { BoxTwoToneIcon } from '@tkeel/console-icons';

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
        const isSelfLearn = basicInfo?.selfLearn ?? false;
        // eslint-disable-next-line no-underscore-dangle
        const isOnline = sysField?._status === 'online' ?? false;

        return (
          <Flex
            key={id}
            marginBottom={i === data.length - 1 ? '0' : '16px'}
            alignItems="center"
          >
            <Flex
              alignItems="center"
              flex="1"
              cursor="pointer"
              onClick={() => {
                navigate(`/detail?id=${id}`);
              }}
            >
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
              <SelfLearnIcon
                isSelfLearn={isSelfLearn}
                styles={{ wrapper: { marginRight: '8px' } }}
              />
              <DeviceStatusIcon isOnline={isOnline} />
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
}
