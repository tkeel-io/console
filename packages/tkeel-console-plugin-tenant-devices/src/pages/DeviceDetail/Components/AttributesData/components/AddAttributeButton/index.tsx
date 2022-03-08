import { useDisclosure } from '@chakra-ui/react';

import { CreateButton } from '@tkeel/console-components';

import useAddAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useAddAttributeMutation';

import AddAttributeModal from '../AddAttributeModal';
// import { Attributes } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

type Props = {
  refetch?: () => void;
};

function AddAttributeButton({ refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isLoading } = useAddAttributeMutation({});
  const handleConfirm = () => {
    mutate({});
    if (refetch) {
      refetch();
    }
  };
  return (
    <>
      <CreateButton onClick={onOpen}>添加属性</CreateButton>
      {isOpen && (
        <AddAttributeModal
          isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default AddAttributeButton;
