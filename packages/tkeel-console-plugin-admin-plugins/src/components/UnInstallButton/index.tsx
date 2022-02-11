import { Button } from '@chakra-ui/react';
import { toast } from '@tkeel/console-components';

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
    <Button
      size="sm"
      colorScheme="primary"
      padding="0 12px"
      boxShadow="none"
      borderRadius="4px"
      onClick={(e) => {
        e.stopPropagation();
        mutate({});
      }}
    >
      卸载
    </Button>
  );
}

export default UnInstallButton;
