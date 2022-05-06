import { MoreActionButton } from '@tkeel/console-components';
import { CaretRightFilledIcon, PauseFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useSwitchNetworkMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useSwitchNetworkMutation';

type Props = {
  status: number;
  id: string;
  refetch?: () => void;
};

function SwitchButton({ status, id, refetch }: Props) {
  const toast = plugin.getPortalToast();
  const { mutate } = useSwitchNetworkMutation({
    id,
    onSuccess(res) {
      const { data } = res;
      toast(data?.status === 0 ? '禁用代理网关成功' : '启用代理网关成功', {
        status: 'success',
      });
      if (refetch) refetch();
    },
  });

  return (
    <MoreActionButton
      icon={status === 0 ? <CaretRightFilledIcon /> : <PauseFilledIcon />}
      title={status === 0 ? '启用代理网关' : '禁用代理网关'}
      onClick={() => {
        mutate({
          data: { status: status === 1 ? 0 : 1 },
        });
      }}
    />
  );
}

export default SwitchButton;
