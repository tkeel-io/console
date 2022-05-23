import { MoreActionButton } from '@tkeel/console-components';
import { CaretRightFilledIcon, PauseFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useModifyProxyMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useModifyProxyMutation';

interface Props {
  status: string;
  id: string;
  refetch?: () => void;
}

function SwitchButton({ status, id, refetch }: Props) {
  const toast = plugin.getPortalToast();
  const { mutate } = useModifyProxyMutation({
    id,
    onSuccess({ data }) {
      toast(
        data?.proxy?.status === 'disabled'
          ? '禁用代理服务成功'
          : '启用代理服务成功',
        {
          status: 'success',
        }
      );
      if (refetch) refetch();
    },
  });

  return (
    <MoreActionButton
      icon={
        status === 'disabled' ? <CaretRightFilledIcon /> : <PauseFilledIcon />
      }
      title={status === 'disabled' ? '启用代理服务' : '禁用代理服务'}
      onClick={() => {
        mutate({
          data: { status: status === 'enabled' ? 'disabled' : 'enabled' },
        });
      }}
    />
  );
}

export default SwitchButton;
