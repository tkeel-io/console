import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { RuleStatus } from '@tkeel/console-types';

import { RULE_STATUS_MAP } from '@/tkeel-console-plugin-tenant-alarm-policy/constants';

import SwitchStatusButton from '../SwitchStatusButton';

interface Props {
  status: RuleStatus;
  ruleId: number;
  onSuccess: () => void;
}

function PolicyStatus({ status, ruleId, onSuccess }: Props) {
  return (
    <Flex alignItems="center">
      <SwitchStatusButton
        status={status}
        ruleId={ruleId}
        onSuccess={onSuccess}
      />
      <Text marginLeft="8px" color="gray.700" fontSize="12px">
        {RULE_STATUS_MAP[status] || ''}
      </Text>
    </Flex>
  );
}

export default memo(PolicyStatus);
