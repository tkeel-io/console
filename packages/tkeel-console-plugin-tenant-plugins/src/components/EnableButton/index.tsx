import { RectangleButton, toast } from '@tkeel/console-components';
import { CaretRightFilledIcon, LoadingFilledIcon } from '@tkeel/console-icons';

import useEnablePluginMutation from '@/tkeel-console-plugin-tenant-plugins/hooks/mutations/useEnablePluginMutation';

type Props = {
  pluginName: string;
  refetchList: () => unknown;
};

function EnableButton({ pluginName, refetchList }: Props) {
  const { mutate, isLoading } = useEnablePluginMutation({
    pluginName,
    onSuccess() {
      toast({ status: 'success', title: '启用插件成功' });
      refetchList();
    },
  });

  return (
    <RectangleButton
      leftIcon={
        isLoading ? (
          <LoadingFilledIcon color="primary" />
        ) : (
          <CaretRightFilledIcon color="primary" />
        )
      }
      canHover
      onClick={(e) => {
        e.stopPropagation();
        mutate({
          data: {},
        });
      }}
    >
      启用
    </RectangleButton>
  );
}

export default EnableButton;
