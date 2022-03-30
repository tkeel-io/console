import { MoreAction } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import DeleteButton from '@/tkeel-console-plugin-tenant-routing-rules/components/DeleteButton';
import SwitchButton from '@/tkeel-console-plugin-tenant-routing-rules/components/SwitchButton';
import CreateRulesButton from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/CreateRulesButton';

type Props = {
  cruxData: {
    id: string;
    name: string;
    desc: string;
    status: number;
    type: number;
  };
  refetch?: () => void;
  onDeleteSuccess?: () => unknown;
};

function MoreActionButton({ cruxData, refetch, onDeleteSuccess }: Props) {
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

  const handleRefetch = () => {
    if (refetch) {
      refetch();
    }
  };

  const handleEditSuccess = () => {
    toast('修改成功', { status: 'success' });
    handleRefetch();
  };

  return (
    <MoreAction
      buttons={[
        <SwitchButton
          key="switch"
          status={cruxData.status}
          id={cruxData.id}
          refetch={handleRefetch}
        />,
        <CreateRulesButton
          key="edit"
          type="editButton"
          cruxData={cruxData}
          onSuccess={handleEditSuccess}
        />,
        <DeleteButton
          key="delete"
          cruxData={cruxData}
          onDeleteSuccess={onDeleteSuccess}
        />,
      ]}
    />
  );
}

export default MoreActionButton;
