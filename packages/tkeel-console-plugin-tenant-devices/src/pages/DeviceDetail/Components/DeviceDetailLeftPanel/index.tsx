/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/cognitive-complexity */
import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { InfoCard } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { BranchTowToneIcon, DotLineFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import { DeviceObject } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import DeviceBasicInfoCard, {
  Basic,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceBasicInfoCard';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceInfoCard';

import Clipboard from './Clipboard';

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
  const tokenStr = sysField?._token ?? '';
  const deviceId = sysField?._id ?? '';
  const isDirectConnection = basicInfo?.directConnection;
  const basic: Basic[] = [
    {
      value: (
        <Flex>
          <Text mr="4px" maxW="120px" isTruncated>
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
          <Clipboard text={sysField?._token ?? ''} />
        </Flex>
      ),
      label: '设备凭证',
    },
    {
      value: basicInfo?.parentName ?? '',
      label: '设备组',
    },
    {
      value: (
        <IconWrapper
          iconBg={useColor(isDirectConnection ? 'violet.100' : 'red.100')}
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
      value: <Text as="u">{basicInfo?.templateName || '暂无模板'}</Text>,
      label: '设备模板',
    },
    {
      value: formatDateTimeByTimestamp({
        timestamp: getTime(sysField?._createdAt),
      }),
      label: '创建时间',
    },
    {
      label: '更新时间',
      value: formatDateTimeByTimestamp({
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
    if (ext[r].name) {
      return {
        label: ext[r].name ?? '',
        value: ext[r].value ?? '',
      };
    }
    return {
      label: r,
      value: basicInfo?.ext[r] ?? '',
    };
  });
  return (
    <VStack spacing="12px" minWidth="360px" flex="1" mr="20px">
      <DeviceInfoCard deviceObject={deviceObject} refetch={refetch} />
      <DeviceBasicInfoCard basic={basic} />
      <InfoCard
        data={extInfo}
        title="扩展信息"
        styles={{
          wrapper: {
            bg: 'white',
            w: '100%',
            minHeight: '108px',
          },
        }}
      />
      )
    </VStack>
  );
}

export default DeviceDetailLeftPanel;
