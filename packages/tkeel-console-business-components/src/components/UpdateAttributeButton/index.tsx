import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';
import { useUpdateAttributeMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { plugin } from '@tkeel/console-utils';

import DeviceAttributeModal, {
  DeviceAttributeFormFields,
} from '../DeviceAttributeModal';

interface Props {
  uid: string;
  defaultValues: DeviceAttributeFormFields;
  refetch?: () => void;
}
function UpdateAttributeButton({
  uid,
  defaultValues,
  refetch = () => {},
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate: updateAttributeMutate, isLoading } =
    useUpdateAttributeMutation({
      id: uid,
      onSuccess: () => {
        toast.success('修改属性成功');
        refetch();
        onClose();
      },
    });
  const handleUpdateAttribute = (formValues: DeviceAttributeFormFields) => {
    const data = {
      [formValues.id]: {
        ...formValues,
      },
    };
    updateAttributeMutate({ data });
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
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          isOpen={isOpen}
          isEdit
          onSubmit={handleUpdateAttribute}
          defaultValues={defaultValues}
        />
      )}
    </>
  );
}
export default UpdateAttributeButton;
