import { Box, Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  DnsAliasesTowToneIcon,
  OfficialFilledIcon,
} from '@tkeel/console-icons';

import MoreOperationButton from '@/tkeel-console-plugin-tenant-networks/components/MoreOperationButton';
import StatusLabel from '@/tkeel-console-plugin-tenant-networks/components/StatusLabel';

interface NetWorkInfo {
  id: string;
  name: string;
  status: 'enabled' | 'disabled';
  ip: string;
  time: string;
  online: string;
}
interface Props {
  data: NetWorkInfo;
}

export default function BasicInfoCard({ data }: Props) {
  const { id, name, status, online } = data;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const whiteColor = useColor('white');
  const grayColor = useColor('gray.50');

  return (
    <Box
      borderTopLeftRadius="4px"
      borderTopRadius="4px"
      backgroundColor="white"
    >
      <Box
        position="relative"
        height="108px"
        background={`linear-gradient(180deg, ${whiteColor} 0%, ${grayColor} 100%)`}
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
          <MoreOperationButton
            cruxData={{
              id,
              name,
              status,
            }}
            onDeleteSuccess={() => {
              queryClient.invalidateQueries('networks');
              navigate('/');
            }}
          />
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          padding="20px 17px 16px"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <DnsAliasesTowToneIcon size={20} />
            <Text fontSize="14px" fontWeight="600" color="gray.800" ml="8px">
              {name}
            </Text>
          </Flex>
          <StatusLabel
            styles={{ wrapper: { ml: '10px', pt: '2px' } }}
            status={status}
            online={online === 'online'}
          />
        </Flex>
      </Box>
    </Box>
  );
}
