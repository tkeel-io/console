import { Switch } from '@chakra-ui/react';

import { RuleStatus } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

import type { RequestData as SwitchStatusRequestData } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useSwitchRuleStatus';
import useSwitchRuleStatus from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/mutations/useSwitchRuleStatus';

interface Props {
  status: RuleStatus;
  ruleId: number;
  onSuccess: () => unknown;
}

export default function SwitchStatusButton({
  status,
  ruleId,
  onSuccess,
}: Props) {
  const toast = plugin.getPortalToast();
  const { mutate } = useSwitchRuleStatus({
    onSuccess(_, variables) {
      const isEnabled =
        (variables as { data: SwitchStatusRequestData }).data.enable ===
        RuleStatus.Enabled;
      toast.success(`${isEnabled ? '启用' : '停用'}告警策略成功`);
      onSuccess();
    },
  });

  return (
    <Switch
      size="sm"
      isChecked={status === RuleStatus.Enabled}
      onChange={(e) => {
        mutate({
          data: {
            enable: e.target.checked ? RuleStatus.Enabled : RuleStatus.Disabled,
            ruleId,
          },
        });
      }}
    />
  );
}
