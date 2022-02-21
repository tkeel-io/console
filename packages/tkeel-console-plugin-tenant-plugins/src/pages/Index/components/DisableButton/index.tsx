import { MoreActionButton, toast } from '@tkeel/console-components';
import { PauseFilledIcon } from '@tkeel/console-icons';

import useDisablePluginMutation from '@/tkeel-console-plugin-tenant-plugins/hooks/mutations/useDisablePluginMutation';

type Props = {
  pluginName: string;
  refetchData: () => unknown;
};

function DisableButton({ pluginName, refetchData }: Props) {
  const { mutate } = useDisablePluginMutation({
    pluginName,
    onSuccess() {
      toast({ status: 'success', title: '停用插件成功' });
      refetchData();
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
