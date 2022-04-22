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
    deviceTemplateId: string;
  };
  refetch?: () => void;
  onDeleteSuccess?: () => unknown;
};

function MoreActionButton({ cruxData, refetch, onDeleteSuccess }: Props) {
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
  ];

  if (cruxData.status !== 1) {
    buttons.push(
      <DeleteButton
        key="delete"
        cruxData={cruxData}
        refetch={handleRefetch}
        onDeleteSuccess={onDeleteSuccess}
      />
    );
  }
  return <MoreAction buttons={buttons} />;
}

export default MoreActionButton;
