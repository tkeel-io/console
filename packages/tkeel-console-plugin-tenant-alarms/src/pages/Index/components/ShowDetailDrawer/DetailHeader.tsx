import { Alert, Flex, Text } from '@chakra-ui/react';
import type { AlarmDetailType } from 'packages/tkeel-console-plugin-tenant-alarms/src/types';

import { AlarmLevelTag } from '@tkeel/console-business-components';
import { MailFilledIcon } from '@tkeel/console-icons';

import AlarmStatusTag from '@/tkeel-console-plugin-tenant-alarms/components/AlarmStatusTag';

import DisposeAlarmButton from '../DisposeAlarmButton';

interface Props {
  record: AlarmDetailType;
}

const Colors = [
  {},
  {
    bgColor: 'red.50',
    borderColor: 'red.300',
  },
  {
    bgColor: 'orange.50',
    borderColor: 'orange.300',
  },
  {
    bgColor: 'teal.50',
    borderColor: 'teal.300',
  },
  {
    bgColor: 'blue.50',
    borderColor: 'blue.300',
  },
];

const successColor = {
  bgColor: 'success.50',
  borderColor: 'success.300',
};

export default function DetailHeader({ record }: Props) {
  const isDispose = record.alarmStatus === 0;
  const colorProps = isDispose ? Colors[record.alarmLevel || 1] : successColor;

  return (
    <Alert
      display="flex"
      border="1px solid"
      borderRadius="4px"
      padding="11px 20px"
      {...colorProps}
    >
      <Flex gap="10px" flex="1">
        <AlarmLevelTag level={record.alarmLevel || 1} />
        <Text fontSize="14px" fontWeight={500}>
          {record.alarmDesc}
        </Text>
      </Flex>
      <Flex gap="20px" alignItems="center">
        <MailFilledIcon
          size="20px"
          color={record.noticeId ? 'primary' : 'gray.300'}
        />
        <AlarmStatusTag
          status={record.alarmStatus || 0}
          styles={{
            wrapper: {
              ml: '0 40px 0 20px',
            },
          }}
        />
        {isDispose && record.alarmId && (
          <DisposeAlarmButton
            type="button"
            alarmId={record.alarmId}
            ruleId={Number(record.ruleId)}
            handOpinions={record.handOpinions || ''}
          />
        )}
      </Flex>
    </Alert>
  );
}
