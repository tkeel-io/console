import { Dispatch, memo, SetStateAction } from 'react';

import { MoreAction, MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';

import DeletePolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/DeletePolicyButton';
import ModifyPolicyButton from '@/tkeel-console-plugin-tenant-alarm-policy/components/ModifyPolicyButton';
import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

interface Props {
  policy: Policy;
  setRuleId: Dispatch<SetStateAction<number | null>>;
  onSuccess: () => void;
}

function PolicyMoreAction({ policy, setRuleId, onSuccess }: Props) {
  return (
    <MoreAction
      styles={{ actionList: { width: '124px' } }}
      buttons={[
        <ModifyPolicyButton
          key="modify"
          policy={policy}
          onSuccess={onSuccess}
        />,
        <MoreActionButton
          key="viewDetail"
          icon={<EyeFilledIcon size="12px" color="grayAlternatives.300" />}
          title="查看策略详情"
          onClick={() => {
            setRuleId(policy.ruleId);
          }}
        />,
        <DeletePolicyButton
          key="delete"
          policy={policy}
          onSuccess={onSuccess}
        />,
      ]}
    />
  );
}

export default memo(PolicyMoreAction);
