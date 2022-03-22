import { useDisclosure } from '@chakra-ui/react';

import { DeviceAttributeFormFields } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useDeleteAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useDeleteAttributeMutation';

interface Props {
  defaultValues: DeviceAttributeFormFields;
  id: string;
  refetch?: () => void;
}
function DeleteAttributeButton({
  id,
  defaultValues,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, id: attrId } = defaultValues;
  const toast = plugin.getPortalToast();
  const { mutate: addAttributeMutate } = useDeleteAttributeMutation({
    id,
    onSuccess: () => {
      toast.success(`删除属性「${name}」成功`);
      refetch();
      onClose();
    },
  });
  const handleDeleteAttribute = () => {
    const data = {
      ids: [attrId],
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
        description={`属性ID: ${attrId}`}
        title={`确定要删除属性「${name}」吗？`}
        onClose={onClose}
        onConfirm={handleDeleteAttribute}
      />
    </>
  );
}
export default DeleteAttributeButton;
