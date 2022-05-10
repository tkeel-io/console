import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';
import { NetworkIcon, OfficialFilledIcon } from '@tkeel/console-icons';

import MoreActionButton from '@/tkeel-console-plugin-tenant-networks/components/MoreActionButton';
import StatusLabel from '@/tkeel-console-plugin-tenant-networks/components/StatusLabel';

// import { ApiData as SubscribeInfo } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useSubscribeInfoQuery';
type NetWorkInfo = {
  id: string;
  name: string;
  status: number;
  ip: string;
  token: string;
  time: string;
};
type Props = {
  data: NetWorkInfo;
  refetchData: () => unknown;
};

export default function BasicInfoCard({ data, refetchData }: Props) {
  const { id, name, status } = data;
  const navigate = useNavigate();
  // const endpoint = data?.endpoint ?? '';
  // const defaultValues = {
  //   description: data?.description ?? '',
  //   endpoint,
  //   id: data?.id ?? '',
  //   title: data?.title ?? '',
  //   is_default: data?.is_default,
  // };

  return (
    <Box
      borderTopLeftRadius="4px"
      borderTopRadius="4px"
      backgroundColor="white"
    >
      <Box
        position="relative"
        height="108px"
        background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
      >
        <OfficialFilledIcon
          style={{
            width: '197px',
            height: '108px',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          padding="10px 10px 0"
        >
          <BackButton
            onClick={() => {
              navigate('/');
            }}
          />
          <MoreActionButton
            cruxData={{
              id,
              name,
              status,
            }}
            refetch={() => {
              refetchData();
            }}
          />
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding="20px 17px 16px"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <NetworkIcon size={20} />
            <Text fontSize="14px" fontWeight="600" color="gray.800" ml="8px">
              {name}
            </Text>
          </Flex>
          <StatusLabel
            styles={{ wrapper: { ml: '10px', pt: '2px' } }}
            status={status}
          />
        </Flex>
      </Box>
    </Box>
  );
}
