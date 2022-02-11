import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { BoxTwoToneIcon, ChevronLeftFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import InfoCard from './InfoCard';
import MoreActionButton from './MoreActionButton';

import InstallButton from '@/tkeel-console-plugin-admin-plugins/components/InstallButton';
import { Installer } from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';

type Props = {
  data: Installer | undefined;
};

function BasicInfo({ data }: Props) {
  const navigate = useNavigate();
  const repo = data?.repo ?? '';
  const version = data?.version ?? '';
  const basicInfo = [
    {
      label: 'Repo',
      value: repo,
    },
    {
      label: 'Tag',
      value: data?.annotations?.['tkeel.io/tag'] ?? '',
    },
    {
      label: 'Ver',
      value: version,
    },
    {
      label: '更新时间',
      value: data?.timestamp
        ? formatDateTimeByTimestamp({ timestamp: `${data.timestamp}000` })
        : '',
    },
  ];

  const installPluginInfo = {
    name: data?.name ?? '',
    version,
    repo,
    installed: data?.installed ?? false,
  };

  return (
    <Box
      width="100%"
      height="350px"
      backgroundColor="white"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
    >
      <Box height="130px" padding="16px" backgroundColor="gray.50">
        <Flex height="28px" justifyContent="space-between">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronLeftFilledIcon />}
            onClick={() => {
              navigate('/');
            }}
          >
            返回
          </Button>
          {data?.installed ? (
            <MoreActionButton pluginName={data.name} />
          ) : (
            <InstallButton size="sm" installPluginInfo={installPluginInfo} />
          )}
        </Flex>
        <Flex marginTop="16px" alignItems="center">
          <Center
            width="48px"
            height="48px"
            borderRadius="16px"
            backgroundColor="gray.100"
          >
            <BoxTwoToneIcon size={22} />
          </Center>
          <Box marginLeft="16px">
            <Text color="gray.800" fontSize="14px" lineHeight="20px">
              {data?.name ?? ''}
            </Text>
            <Text color="gray.500" fontSize="12px" lineHeight="17px">
              {data?.desc ?? ''}
            </Text>
          </Box>
        </Flex>
      </Box>
      <InfoCard data={basicInfo} />
    </Box>
  );
}

export default BasicInfo;
