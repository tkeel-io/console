import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';
import { useCreateAttributeMutation } from '@tkeel/console-request-hooks/src/hooks/mutations';
import { plugin } from '@tkeel/console-utils';

import DeviceAttributeModal, {
  DeviceAttributeFormFields,
} from '../DeviceAttributeModal';

type Props = {
  uid: string;
  refetch?: () => void;
};

function CreateAttributeButton({ uid, refetch = () => {} }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate: addAttributeMutate, isLoading } = useCreateAttributeMutation({
    uid,
    onSuccess: () => {
      toast.success('添加属性成功');
      refetch();
      onClose();
    },
  });

  const handleAddAttribute = (formValues: DeviceAttributeFormFields) => {
    const data = {
      [formValues.id]: {
        ...formValues,
      },
    };
    addAttributeMutate({ data });
  };
  return (
    <>
      <CreateButton onClick={onOpen}>添加属性</CreateButton>
      {isOpen && (
        <DeviceAttributeModal
          isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          isEdit={false}
          onClose={onClose}
          onSubmit={handleAddAttribute}
        />
      )}
    </>
  );
}

export default CreateAttributeButton;
