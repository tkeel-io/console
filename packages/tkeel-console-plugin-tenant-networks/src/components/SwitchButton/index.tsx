import { MoreActionButton } from '@tkeel/console-components';
import { CaretRightFilledIcon, PauseFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useModifyNetworkMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useModifyNetworkMutation';

interface Props {
  status: 'enabled' | 'disabled';
  id: string;
  refetch?: () => void;
}

function SwitchButton({ status, id, refetch }: Props) {
  const toast = plugin.getPortalToast();
  const { mutate } = useModifyNetworkMutation({
    id,
    onSuccess({ data }) {
      toast(
        data?.client?.status === 'disabled'
          ? '禁用代理网关成功'
          : '启用代理网关成功',
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
      title={status === 'disabled' ? '启用代理网关' : '禁用代理网关'}
      onClick={() => {
        mutate({
          data: {
            client: {
              status: status === 'enabled' ? 'disabled' : 'enabled',
            },
          },
        });
      }}
    />
  );
}

export default SwitchButton;
