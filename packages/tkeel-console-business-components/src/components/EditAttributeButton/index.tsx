import { useDisclosure } from '@chakra-ui/react';

import { DeviceAttributeModal } from '@tkeel/console-business-components';
import { DeviceAttributeFormFields } from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

interface Props {
  handleSubmit: (values: DeviceAttributeFormFields) => void;
  defaultValues: DeviceAttributeFormFields;
}
function EditAttributeButton({ handleSubmit, defaultValues }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="编辑属性"
        onClick={onOpen}
      />
      <DeviceAttributeModal
        onClose={onClose}
        isOpen={isOpen}
        isEdit
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </>
  );
}
export default EditAttributeButton;
