import { Box, StyleProps, Text } from '@chakra-ui/react';
import {
  AlarmInfoCardArr,
  AlarmPolicyInfoCardArr,
} from 'packages/tkeel-console-plugin-tenant-alarms/src/constants';
import { memo } from 'react';

import {
  AlarmInfoCard,
  NotificationObjectsInfoCard,
} from '@tkeel/console-business-components';
import { Drawer } from '@tkeel/console-components';
import { useAlarmRuleDetailQuery } from '@tkeel/console-request-hooks';

import type {
  AlarmDetailType,
  AlarmItem,
} from '@/tkeel-console-plugin-tenant-alarms/types';

import DetailHeader from './DetailHeader';

export interface Props {
  isOpen: boolean;
  details: AlarmItem;
  onClose: () => unknown;
  enabled: boolean;
}

function ShowDetailDrawer({ isOpen, onClose, details, enabled }: Props) {
  const { ruleDetail } = useAlarmRuleDetailQuery({
    ruleId: details.ruleId,
    enabled,
  });

  const alarmDetails: AlarmDetailType = {
    ...details,
    ...ruleDetail,
  };

  const alarmCardArr = AlarmInfoCardArr(alarmDetails);
  const alarmPolicyInfoCardArr = AlarmPolicyInfoCardArr(alarmDetails);

  const titleStyle: StyleProps = {
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
    marginBottom: '8px',
    marginTop: '20px',
  };

  return (
    <Drawer title="告警详情" width="700px" isOpen={isOpen} onClose={onClose}>
      <Box padding="20px 32px">
        <DetailHeader record={details} />

        <Text {...titleStyle}>告警信息</Text>
        <AlarmInfoCard
          info={alarmCardArr}
          styles={{
            value: {
              noOfLines: 1,
              flex: 1,
            },
          }}
        />

        <Text {...titleStyle}>告警策略</Text>
        <AlarmInfoCard
          info={alarmPolicyInfoCardArr}
          styles={{
            value: {
              noOfLines: 1,
              flex: 1,
            },
          }}
        />

        <>
          <Text {...titleStyle}>通知对象</Text>
          <NotificationObjectsInfoCard noticeId={alarmDetails.noticeId || ''} />
        </>
      </Box>
    </Drawer>
  );
}

export default memo(ShowDetailDrawer);
