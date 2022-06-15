import { MoreAction } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import CreateNotificationButton from '../CreateNotificationButton';
import DeleteNotificationButton from '../DeleteNotificationButton';

interface Props {
  cruxData: {
    id: number;
    name: string;
    desc: string;
  };
  refetch?: () => void;
}

function MoreOperationButton({ cruxData, refetch }: Props) {
  const { id, name, desc } = cruxData;
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
    <CreateNotificationButton
      key="edit"
      type="editButton"
      id={id ?? 0}
      groupName={name}
      description={desc}
      onSuccess={handleEditSuccess}
    />,
    <DeleteNotificationButton
      key="delete"
      cruxData={cruxData}
      refetch={handleRefetch}
    />,
  ];

  return (
    <MoreAction
      buttons={buttons}
      styles={{ wrapper: { margin: '16px' }, actionList: { width: '124px' } }}
    />
  );
}

export default MoreOperationButton;
