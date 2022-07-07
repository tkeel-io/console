import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { useDeleteTelemetryMutation } from '@tkeel/console-request-hooks';
import { TelemetryItem } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

interface Props {
  selectedDevices: TelemetryItem[];
  uid: string;
  refetch?: () => void;
  deleteCallback?: (selectedDevices: TelemetryItem[]) => void;
}

function DeleteTelemetryButton({
  selectedDevices,
  refetch = () => {},
  uid,
  deleteCallback,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const names: string[] = [];
  const ids: string[] = [];

  selectedDevices.forEach((item) => {
    names.push(item.name);
    ids.push(item.id);
  });
  const toast = plugin.getPortalToast();

  const { mutate: deleteTemplateMutate, isLoading } =
    useDeleteTelemetryMutation({
      uid,
      onSuccess() {
        toast('删除成功', { status: 'success' });
        if (deleteCallback) {
          deleteCallback(selectedDevices);
        }
        refetch();
        onClose();
      },
    });

  const handleConfirm = () => {
    deleteTemplateMutate({ data: { ids } });
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon color="grayAlternatives.300" size="12px" />}
        title="删除遥测"
        onClick={onOpen}
      />
      <Alert
        icon="warning"
        iconPosition="left"
        isOpen={isOpen}
        description={`遥测ID: ${ids.join('，')}`}
        title={`确定要删除遥测「${names.join('，')}」吗？`}
        onClose={onClose}
        isConfirmButtonLoading={isLoading}
        onConfirm={handleConfirm}
      />
    </>
  );
}
export default DeleteTelemetryButton;
