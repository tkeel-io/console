/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/cognitive-complexity */
import { Box, VStack } from '@chakra-ui/react';
import { InfoCard } from '@tkeel/console-components';
import { BranchTowToneIcon, DotLineFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import DeviceBasicInfoCard, {
  Basic,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceBasicInfoCard';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceInfoCard';
import { selfLearnColor } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';
import { IconWrapper } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/index.style';

function DeviceDetailLeftPanel({ id }: { id: string }): JSX.Element {
  const { sysField, basicInfo } = useDeviceDetailQuery({
    id,
  });
  const tokenStr = sysField?._token || '';
  const basic: Basic[] = [
    {
      value: sysField?._id || '',
      label: '设备ID',
    },
    {
      value: `${tokenStr.slice(0, 4)}*******${tokenStr.slice(-5, -1)}`,
      label: '设备凭证',
    },
    {
      value: basicInfo?.parentId || '',
      label: '设备组',
    },
    {
      value: basicInfo?.directConnection ? (
        <IconWrapper
          bg={basicInfo?.directConnection ? '#EAECF9' : '#FAEBEC'}
          color={basicInfo?.directConnection ? '#4257ED' : '#FA7474'}
        >
          <DotLineFilledIcon />
          <Box as="span" ml="4px" fontSize="12px">
            {basicInfo?.directConnection ? '直连' : '非直连'}
          </Box>
        </IconWrapper>
      ) : (
        <IconWrapper
          bg={basicInfo?.directConnection ? '#EAECF9' : '#FAEBEC'}
          color={basicInfo?.directConnection ? '#4257ED' : '#FA7474'}
        >
          <BranchTowToneIcon />
          <Box as="span" ml="4px" fontSize="12px">
            {basicInfo?.directConnection ? '直连' : '非直连'}
          </Box>
        </IconWrapper>
      ),
      label: '连接方式',
    },
    {
      value: formatDateTimeByTimestamp({
        timestamp: `${sysField?._createdAt || 0}000`,
      }),
      label: '创建时间',
    },
    {
      label: '更新时间',
      value: formatDateTimeByTimestamp({
        timestamp: `${sysField?._updatedAt || 0}000`,
      }),
    },
    {
      value: basicInfo?.description || '',
      label: '描述',
    },
  ];
  const keys = Object.keys(basicInfo?.ext || {});
  const extInfo = keys.map((r) => {
    return {
      value: basicInfo?.ext[r].value || '',
      label: basicInfo?.ext[r].name || '',
    };
  });
  const status = sysField?._status ?? 'offline';
  const selfLearn = basicInfo?.selfLearn
    ? selfLearnColor[1]
    : selfLearnColor[0];
  return (
    <VStack spacing="12px" minWidth="360px" flex={1} mr="20px">
      <DeviceInfoCard
        selfLearn={selfLearn}
        isSelfLearn={basicInfo?.selfLearn}
        status={status}
      />
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
