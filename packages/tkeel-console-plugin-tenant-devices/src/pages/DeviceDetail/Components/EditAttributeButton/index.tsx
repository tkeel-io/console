import { useDisclosure } from '@chakra-ui/react';

import { DeviceAttributeModal } from '@tkeel/console-business-components';
import { DeviceAttributeFormFields } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { useEditAttributeMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { plugin } from '@tkeel/console-utils';

interface Props {
  id: string;
  defaultValues: DeviceAttributeFormFields;
  refetch?: () => void;
}
function EditAttributeButton({ id, defaultValues, refetch = () => {} }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate: editAttributeMutate } = useEditAttributeMutation({
    id,
    onSuccess: () => {
      toast.success('修改属性成功');
      refetch();
      onClose();
    },
  });
  const handleEditAttribute = (formValues: DeviceAttributeFormFields) => {
    const data = {
      [formValues.id]: {
        ...formValues,
      },
    };
    editAttributeMutate({ data });
  };
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="编辑属性"
        onClick={onOpen}
      />
      {isOpen && (
        <DeviceAttributeModal
          onClose={onClose}
          isOpen={isOpen}
          isEdit
          onSubmit={handleEditAttribute}
          defaultValues={defaultValues}
        />
      )}
    </>
  );
}
export default EditAttributeButton;
