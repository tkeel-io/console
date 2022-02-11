import { MoreActionButton, toast } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

import useDeletePluginMutation from '@/tkeel-console-plugin-admin-plugins/hooks/mutations/useDeletePluginMutation';

interface Props {
  pluginName: string;
  onSuccess: () => unknown;
}

function UnInstallButton({ pluginName, onSuccess }: Props) {
  const { mutate } = useDeletePluginMutation({
    name: pluginName,
    onSuccess() {
      onSuccess();
      toast({ status: 'success', title: '卸载插件成功' });
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

export default UnInstallButton;
