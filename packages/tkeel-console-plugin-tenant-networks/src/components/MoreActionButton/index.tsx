import { MoreAction } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import DeleteButton from '@/tkeel-console-plugin-tenant-networks/components/DeleteButton';
import InstallButton from '@/tkeel-console-plugin-tenant-networks/components/InstallButton';
import SwitchButton from '@/tkeel-console-plugin-tenant-networks/components/SwitchButton';
import CreateNetworkButton from '@/tkeel-console-plugin-tenant-networks/pages/Index/components/CreateNetworkButton';

type Props = {
  cruxData: {
    id: string;
    name: string;
    status: number;
  };
  refetch?: () => void;
  onDeleteSuccess?: () => unknown;
};

function MoreActionButton({ cruxData, refetch, onDeleteSuccess }: Props) {
  const { id, name, status } = cruxData;
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

  const buttons = [
    <SwitchButton
      key="switch"
      status={status}
      id={id}
      refetch={handleRefetch}
    />,
    <InstallButton
      key="install"
      // refetch={handleRefetch}
      // onDeleteSuccess={onDeleteSuccess}
    />,
    <CreateNetworkButton
      key="edit"
      type="editButton"
      networkName={name}
      onSuccess={handleEditSuccess}
    />,
    <DeleteButton
      key="delete"
      cruxData={cruxData}
      refetch={handleRefetch}
      onDeleteSuccess={onDeleteSuccess}
    />,
  ];

  return (
    <MoreAction buttons={buttons} styles={{ actionList: { width: '124px' } }} />
  );
}

export default MoreActionButton;
