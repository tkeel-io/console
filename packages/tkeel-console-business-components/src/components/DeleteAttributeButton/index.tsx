import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { useDeleteAttributeMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { plugin } from '@tkeel/console-utils';

import { DeviceAttributeFormFields } from '../DeviceAttributeModal';

interface Props {
  defaultValues: DeviceAttributeFormFields;
  uid: string;
  refetch?: () => void;
}
function DeleteAttributeButton({
  uid,
  defaultValues,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, id } = defaultValues;
  const toast = plugin.getPortalToast();
  const { mutate: addAttributeMutate, isLoading } = useDeleteAttributeMutation({
    id: uid,
    onSuccess: () => {
      toast.success(`删除属性「${name}」成功`);
      refetch();
      onClose();
    },
  });
  const handleDeleteAttribute = () => {
    const data = {
      ids: [id],
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
        description={`属性ID: ${id}`}
        title={`确定要删除属性「${name}」吗？`}
        onClose={onClose}
        onConfirm={handleDeleteAttribute}
      />
    </>
  );
}
export default DeleteAttributeButton;
