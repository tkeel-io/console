import { useGlobalPluginProps } from '@tkeel/console-business-components';
import { MoreActionButton, toast } from '@tkeel/console-components';
import { PauseFilledIcon } from '@tkeel/console-icons';

import useDisablePluginMutation from '@/tkeel-console-plugin-tenant-plugins/hooks/mutations/useDisablePluginMutation';

type Props = {
  pluginName: string;
  refetchList: () => unknown;
};

function DisableButton({ pluginName, refetchList }: Props) {
  const { refetchMenus } = useGlobalPluginProps();

  const { mutate } = useDisablePluginMutation({
    pluginName,
    onSuccess() {
      toast({ status: 'success', title: '停用插件成功' });
      refetchList();
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
