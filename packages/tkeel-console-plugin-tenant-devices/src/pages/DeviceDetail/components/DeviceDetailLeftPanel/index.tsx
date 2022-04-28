import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { IconWrapper } from '@tkeel/console-business-components';
import { Clipboard, InfoCard } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { BranchTowToneIcon, DotLineFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import DeviceBasicInfoCard, {
  Basic,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceBasicInfoCard';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceInfoCard';

type Props = {
  deviceObject: DeviceObject;
  refetch?: () => void;
};

const getTime = (value: number | undefined) => {
  if (!value) {
    return '0000';
  }
  return value.toString().length < 13 ? `${value}000` : `${value}`;
};

function DeviceDetailLeftPanel({ deviceObject, refetch }: Props): JSX.Element {
  const properties = deviceObject?.properties;
  const { sysField, basicInfo } = properties;
  // eslint-disable-next-line no-underscore-dangle
  const tokenStr = sysField?._token ?? '';
  // eslint-disable-next-line no-underscore-dangle
  const deviceId = sysField?._id ?? '';
  const isDirectConnection = basicInfo?.directConnection;
  const { navigate } = plugin.getPortalProps().client;
  const handleNavigateTemplate = ({ templateId }: { templateId: string }) => {
    navigate(
      `tenant-device-templates/detail/${templateId}?menu-collapsed=true`
    );
  };
  const basic: Basic[] = [
    {
      value: (
        <Flex>
          <Text mr="4px" maxW="160px" isTruncated>
            {deviceId}
          </Text>
          <Clipboard text={deviceId} />
        </Flex>
      ),
      label: '设备ID',
    },
    {
      value: (
        <Flex>
          <Text mr="4px">{`${tokenStr.slice(0, 4)}*******${tokenStr.slice(
            -4
          )}`}</Text>
          <Clipboard
            // eslint-disable-next-line no-underscore-dangle
            text={sysField?._token ?? ''}
          />
        </Flex>
      ),
      label: '设备凭证',
    },
    {
      value: basicInfo?.parentName || '默认分组',
      label: '设备组',
    },
    {
      value: (
        <IconWrapper
          bg={useColor(isDirectConnection ? 'violet.100' : 'red.100')}
          padding="0 4px"
          width="max-content"
        >
          {isDirectConnection ? <DotLineFilledIcon /> : <BranchTowToneIcon />}
          <Box
            as="span"
            ml="4px"
            fontSize="12px"
            color={isDirectConnection ? 'violet.500' : 'red.200'}
          >
            {isDirectConnection ? '直连' : '非直连'}
          </Box>
        </IconWrapper>
      ),
      label: '连接方式',
    },
    {
      value: (
        <Text
          as={basicInfo?.templateName ? 'u' : 'p'}
          cursor={basicInfo?.templateId ? 'pointer' : 'default'}
          onClick={() => {
            if (basicInfo?.templateId) {
              handleNavigateTemplate({ templateId: basicInfo.templateId });
            }
          }}
        >
          {basicInfo?.templateName || '暂无模板'}
        </Text>
      ),
      label: '设备模板',
    },
    {
      value: formatDateTimeByTimestamp({
        // eslint-disable-next-line no-underscore-dangle
        timestamp: getTime(sysField?._createdAt),
      }),
      label: '创建时间',
    },
    {
      label: '更新时间',
      value: formatDateTimeByTimestamp({
        // eslint-disable-next-line no-underscore-dangle
        timestamp: getTime(sysField?._createdAt),
      }),
    },
    {
      value: basicInfo?.description ?? '',
      label: '描述',
    },
  ];
  const ext = basicInfo?.ext ?? {};
  const keys = Object.keys(ext);
  const extInfo = keys.map((r) => {
    return {
      label: r,
      value: basicInfo?.ext[r] ?? '',
    };
  });
  return (
    <VStack spacing="12px" width="360px" mr="20px">
      <DeviceInfoCard deviceObject={deviceObject} refetch={refetch} />
      <DeviceBasicInfoCard basic={basic} />
      <InfoCard
        data={extInfo}
        title="扩展信息"
        styles={{
          wrapper: {
            bg: 'white',
            w: '100%',
          },
        }}
      />
      )
    </VStack>
  );
}

export default DeviceDetailLeftPanel;
