/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/cognitive-complexity */
import { Box, Flex, Text, useClipboard, VStack } from '@chakra-ui/react';
import { InfoCard } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  BranchTowToneIcon,
  CopyFilledIcon,
  DotLineFilledIcon,
} from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import {
  BasicInfo,
  ConnectInfo,
  SysField,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import DeviceBasicInfoCard, {
  Basic,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceBasicInfoCard';
import DeviceInfoCard from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeviceInfoCard';
import { SELF_LEARN_COLORS } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

type Props = {
  id: string;
  sysField?: SysField;
  basicInfo?: BasicInfo;
  connectInfo?: ConnectInfo;
};

const getTime = (value: number | undefined) => {
  if (!value) {
    return '0000';
  }
  return value.toString().length < 13 ? `${value}000` : `${value}`;
};

function DeviceDetailLeftPanel({
  id,
  sysField,
  basicInfo,
  connectInfo,
}: Props): JSX.Element {
  const tokenStr = sysField?._token || '';
  const isDirectConnection = basicInfo?.directConnection;
  const { hasCopied, onCopy } = useClipboard(sysField?._token || '暂无token');
  const basic: Basic[] = [
    {
      value: sysField?._id || '',
      label: '设备ID',
    },
    {
      value: (
        <Flex>
          <Text mr="4px">{`${tokenStr.slice(0, 4)}*******${tokenStr.slice(
            -4
          )}`}</Text>
          {hasCopied && (
            <Text color="primary" mr="8px">
              已复制
            </Text>
          )}
          <Text cursor="pointer" onClick={onCopy} mt="2px">
            <CopyFilledIcon color="grayAlternatives.300" />
          </Text>
        </Flex>
      ),
      label: '设备凭证',
    },
    {
      value: basicInfo?.parentId || '',
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
      value: <Text as="u">{basicInfo?.templateName || ''}</Text>,
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
      value: basicInfo?.description || '',
      label: '描述',
    },
  ];
  const ext = basicInfo?.ext || {};
  const keys = Object.keys(ext);
  const extInfo = keys.map((r) => {
    if (ext[r].name) {
      return {
        label: ext[r].name || '',
        value: ext[r].value || '',
      };
    }
    return {
      label: r,
      value: basicInfo?.ext[r] || '',
    };
  });
  const selfLearn = basicInfo?.selfLearn
    ? SELF_LEARN_COLORS[1]
    : SELF_LEARN_COLORS[0];
  return (
    <VStack spacing="12px" minWidth="360px" flex="1" mr="20px">
      <DeviceInfoCard
        id={id}
        subscribeAddr={sysField?._subscribeAddr || ''}
        deviceName={basicInfo?.name || ''}
        selfLearn={selfLearn}
        isSelfLearn={basicInfo?.selfLearn}
        status={connectInfo?._online}
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
