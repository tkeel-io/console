import { MoreActionButton } from '@tkeel/console-components';
import { CaretRightFilledIcon, PauseFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useModifyProxyMutation from '@/tkeel-console-plugin-tenant-networks/hooks/mutations/useModifyProxyMutation';

interface Props {
  clientId: string;
  cruxData: {
    id: string;
    status: 'enabled' | 'disabled';
    device_id: string;
    device_name: string;
    name: string;
    host: string;
    port: string;
    protocol: string;
    remark: string;
  };
  refetch?: () => void;
}

function SwitchProxyButton({ cruxData, clientId, refetch }: Props) {
  const {
    id,
    status,
    remark,
    name,
    host,
    port,
    protocol,
    device_id: deviceId,
    device_name: deviceName,
  } = cruxData;
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
          data: {
            status: status === 'enabled' ? 'disabled' : 'enabled',
            remark,
            name,
            host,
            port,
            protocol,
            device_id: deviceId,
            device_name: deviceName,
            client_id: Number(clientId),
          },
        });
      }}
    />
  );
}

export default SwitchProxyButton;
