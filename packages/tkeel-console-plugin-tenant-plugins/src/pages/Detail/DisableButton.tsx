import { RectangleButton, toast } from '@tkeel/console-components';
import { CaretRightFilledIcon, LoadingFilledIcon } from '@tkeel/console-icons';

import useDisablePluginMutation from '@/tkeel-console-plugin-tenant-plugins/hooks/mutations/useDisablePluginMutation';

type Props = {
  pluginName: string;
  refetchData: () => unknown;
};

function DisableButton({ pluginName, refetchData }: Props) {
  const { mutate, isLoading } = useDisablePluginMutation({
    pluginName,
    onSuccess() {
      toast({ status: 'success', title: '停用插件成功' });
      refetchData();
    },
  });

  return (
    <RectangleButton
      backgroundColor="gray.800"
      leftIcon={
        isLoading ? (
          <LoadingFilledIcon color="white" />
        ) : (
          <CaretRightFilledIcon color="white" />
        )
      }
      onClick={(e) => {
        e.stopPropagation();
        mutate({});
      }}
    >
      停用
    </RectangleButton>
  );
}

export default DisableButton;
