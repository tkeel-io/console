import { useDisclosure } from '@chakra-ui/react';

import { DeviceAttributeModal } from '@tkeel/console-business-components';
import { DeviceAttributeFormFields } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import { CreateButton } from '@tkeel/console-components';
import { plugin } from '@tkeel/console-utils';

import useAddAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useAddAttributeMutation';

type Props = {
  id: string;
  refetch?: () => void;
};

function AddAttributeButton({ id, refetch = () => {} }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = plugin.getPortalToast();
  const { mutate: addAttributeMutate } = useAddAttributeMutation({
    id,
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
          // isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          isEdit={false}
          onClose={onClose}
          onSubmit={handleAddAttribute}
        />
      )}
    </>
  );
}

export default AddAttributeButton;
