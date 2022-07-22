import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { useDeleteAttributeMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { AttributeItem } from '@tkeel/console-types';
import { plugin } from '@tkeel/console-utils';

interface Props {
  selectedDevices: AttributeItem[];
  uid: string;
  refetch?: () => void;

  deleteCallback?: (selectedDevices: AttributeItem[]) => void;
}
function DeleteAttributeButton({
  uid,
  selectedDevices,
  refetch = () => {},
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
  const { mutate: addAttributeMutate, isLoading } = useDeleteAttributeMutation({
    id: uid,
    onSuccess: () => {
      toast.success(`删除属性成功`);
      if (deleteCallback) {
        deleteCallback(selectedDevices);
      }
      refetch();
      onClose();
    },
  });
  const handleDeleteAttribute = () => {
    if (selectedDevices.length === 0) {
      toast('请选择属性', { status: 'error' });
      return;
    }
    const data = {
      ids,
    };
    addAttributeMutate({ data });
  };
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除属性"
        onClick={onOpen}
      />
      <Alert
        icon="warning"
        iconPosition="left"
        isOpen={isOpen}
        isConfirmButtonLoading={isLoading}
        description={`属性ID: ${ids.join('，')}`}
        title={`确定要删除属性「${names.join('，')}」吗？`}
        onClose={onClose}
        onConfirm={handleDeleteAttribute}
      />
    </>
  );
}
export default DeleteAttributeButton;
