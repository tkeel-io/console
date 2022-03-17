import { useDisclosure } from '@chakra-ui/react';

import { DeviceAttributeModal } from '@tkeel/console-business-components';
import { DeviceAttributeFormFields } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import { CreateButton } from '@tkeel/console-components';

type Props = {
  handleSubmit: (values: DeviceAttributeFormFields) => void;
};

function AddAttributeButton({ handleSubmit = () => {} }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CreateButton onClick={onOpen}>添加属性</CreateButton>
      {isOpen && (
        <DeviceAttributeModal
          // isConfirmButtonLoading={isLoading}
          isOpen={isOpen}
          isEdit={false}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default AddAttributeButton;
