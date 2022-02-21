/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/cognitive-complexity */
import { Box, VStack } from '@chakra-ui/react';
import { InfoCard } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { BranchTowToneIcon, DotLineFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import DeviceBasicInfoCard, {
  Basic,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceBasicInfoCard';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceInfoCard';
import { SELF_LEARN_COLORS } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

function DeviceDetailLeftPanel({ id }: { id: string }): JSX.Element {
  const { sysField, basicInfo } = useDeviceDetailQuery({
    id,
  });
  const tokenStr = sysField?._token || '';
  const isDirectConnection = basicInfo?.directConnection;
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
      value: (
        <IconWrapper
          iconBg={useColor(isDirectConnection ? 'purple.100' : 'red.50')}
        >
          {isDirectConnection ? <DotLineFilledIcon /> : <BranchTowToneIcon />}
          <Box
            as="span"
            ml="4px"
            fontSize="12px"
            color={isDirectConnection ? 'violet.500' : 'red.100'}
          >
            {isDirectConnection ? '直连' : '非直连'}
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
  const company = basicInfo?.ext.company;
  const location = basicInfo?.ext.location;
  const extInfo = [
    {
      value: company?.value || '',
      label: company?.name || '',
    },
    {
      value: location?.value || '',
      label: location?.name || '',
    },
  ];
  const status = sysField?._status ?? 'offline';
  const selfLearn = basicInfo?.selfLearn
    ? SELF_LEARN_COLORS[1]
    : SELF_LEARN_COLORS[0];
  return (
    <VStack spacing="12px" minWidth="360px" flex="1" mr="20px">
      <DeviceInfoCard
        subscribeAddr={sysField?._subscribe_addr || ''}
        deviceName={basicInfo?.name || ''}
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
