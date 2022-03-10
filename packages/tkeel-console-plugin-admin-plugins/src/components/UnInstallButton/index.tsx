import { MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeletePluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useDeletePluginMutation';

interface Props {
  pluginName: string;
  onSuccess: () => unknown;
}

function UninstallButton({ pluginName, onSuccess }: Props) {
  const toast = plugin.getPortalToast();
  const { mutate } = useDeletePluginMutation({
    name: pluginName,
    onSuccess() {
      onSuccess();
      toast('卸载插件成功', { type: 'success' });
    },
  });

  return (
    <MoreActionButton
      icon={<TrashFilledIcon />}
      title="卸载"
      onClick={() => {
        mutate({});
      }}
    />
  );
}

export default UninstallButton;
