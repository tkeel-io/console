import { MoreActionButton } from '@tkeel/console-components';
import { CaretRightFilledIcon, PauseFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useSwitchRulesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useSwitchRulesMutation';

type Props = {
  status: number;
  id: string;
  refetch?: () => void;
};

function SwitchButton({ status, id, refetch }: Props) {
  const toast = plugin.getPortalToast();
  const { mutate } = useSwitchRulesMutation({
    id,
    onSuccess(res) {
      const { data } = res;
      toast(data?.status === 0 ? '停用规则成功' : '启动规则成功', {
        status: 'success',
      });
      if (refetch) refetch();
    },
  });

  return (
    <MoreActionButton
      icon={status === 0 ? <CaretRightFilledIcon /> : <PauseFilledIcon />}
      title={status === 0 ? '启动规则' : '停用规则'}
      onClick={() => {
        mutate({
          data: { status: status === 1 ? 0 : 1 },
        });
      }}
    />
  );
}

export default SwitchButton;
