import { Box, Circle, Flex, Image, Text } from '@chakra-ui/react';
import { InfoCard } from '@tkeel/console-components';
import { BoxTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import DisableButton from './DisableButton';

import EnableButton from '@/tkeel-console-plugin-tenant-plugins/components/EnableButton';
import usePluginDetailQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/queries/usePluginDetailQuery';

type Props = {
  pluginName: string;
};

function Detail({ pluginName }: Props) {
  const { plugin, refetch } = usePluginDetailQuery({ pluginName });
  const installerBrief = plugin?.installer_brief;
  const basicInfo = [
    {
      label: '插件源',
      value: installerBrief?.repo ?? '',
    },
    {
      label: '安装时间',
      value: plugin?.register_timestamp
        ? formatDateTimeByTimestamp({
            timestamp: `${plugin.register_timestamp}000`,
          })
        : '',
    },
    {
      label: '版本',
      value: installerBrief?.version ?? '',
    },
  ];

  const developerInfo = [
    {
      label: '提供者',
      value: 'developer',
    },
    {
      label: '联系方式',
      value: 'developer@yunify.com',
    },
  ];

  const name = installerBrief?.name ?? '';
  const icon = installerBrief?.icon ?? '';
  const desc = installerBrief?.desc ?? '';

  const infoCardStyles = {
    wrapper: { marginBottom: '24px', padding: '0', boxShadow: 'none' },
    content: {
      marginTop: '12px',
      padding: '8px 24px 16px',
      backgroundColor: 'gray.50',
    },
    label: {
      color: 'grayAlternatives.300',
    },
  };
  return (
    <Box>
      <Flex
        padding="20px 0 20px 24px"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="grayAlternatives.50"
      >
        <Circle size="76px" backgroundColor="gray.50">
          {icon ? (
            <Image width="28px" height="28px" src={icon} />
          ) : (
            <BoxTwoToneIcon size={32} />
          )}
        </Circle>
        <Box marginLeft="20px">
          <Text
            color="gray.800"
            fontSize="16px"
            fontWeight="500"
            lineHeight="22px"
          >
            {name}
          </Text>
          <Text
            margin="4px 0"
            height="24px"
            color="grayAlternatives.300"
            fontSize="12px"
            lineHeight="24px"
            isTruncated
            title={desc}
          >
            {desc}
          </Text>
          {plugin?.tenant_enable ? (
            <DisableButton
              pluginName={name}
              refetchData={() => {
                refetch();
              }}
            />
          ) : (
            <EnableButton
              pluginName={name}
              refetchData={() => {
                refetch();
              }}
            />
          )}
        </Box>
      </Flex>
      <Box padding="24px 24px">
        <InfoCard data={basicInfo} styles={infoCardStyles} />
        <InfoCard
          title="开发者信息"
          data={developerInfo}
          styles={infoCardStyles}
        />
      </Box>
    </Box>
  );
}

export default Detail;
