import { MoreActionButton } from '@tkeel/console-components';
import { PauseFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDisablePluginMutation from '@/tkeel-console-plugin-tenant-plugins/hooks/mutations/useDisablePluginMutation';

type Props = {
  pluginName: string;
  refetchData: () => unknown;
};

function DisableButton({ pluginName, refetchData }: Props) {
  const portalProps = plugin.getPortalProps();
  const { refetchMenus } = portalProps.client;
  const toast = plugin.getPortalToast();

  const { mutate } = useDisablePluginMutation({
    pluginName,
    onSuccess() {
      toast('停用插件成功', { status: 'success' });
      refetchData();
      refetchMenus();
    },
  });

  return (
    <MoreActionButton
      icon={<PauseFilledIcon />}
      title="停用"
      onClick={() => {
        mutate({});
      }}
    />
  );
}

export default DisableButton;
