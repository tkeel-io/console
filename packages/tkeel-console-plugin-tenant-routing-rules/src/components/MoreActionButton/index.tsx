import { MoreAction } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import DeleteButton from '@/tkeel-console-plugin-tenant-routing-rules/components/DeleteButton';
import SwitchButton from '@/tkeel-console-plugin-tenant-routing-rules/components/SwitchButton';
import CreateRulesButton from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/CreateRulesButton';

type Props = {
  cruxData: {
    id: string;
    status: number;
  };
};

function MoreActionButton({ cruxData }: Props) {
  // const portalProps = plugin.getPortalProps();
  // const { refetchMenus } = portalProps.client;
  // const toast = plugin.getPortalToast();

  // const { mutate } = useDisablePluginMutation({
  //   pluginName,
  //   onSuccess() {
  //     toast('停用插件成功', { status: 'success' });
  //     refetchList();
  //     refetchMenus();
  //   },
  // });
  const toast = plugin.getPortalToast();

  const handleCreateUserSuccess = () => {
    toast('创建成功', { status: 'success' });
    // refetch();
  };

  return (
    <MoreAction
      buttons={[
        <SwitchButton key="switch" status={cruxData.status} />,
        <CreateRulesButton
          key="edit"
          type="editButton"
          onSuccess={handleCreateUserSuccess}
        />,
        <DeleteButton key="delete" />,
      ]}
    />
  );
}

export default MoreActionButton;
