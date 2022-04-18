import { useDisclosure } from '@chakra-ui/react';

import { IconButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import CommandParamModal from '../CommandParamModal';
import { CommandParamFormField, ParamType } from '../CommandParamModal/types';

interface Props {
  paramType: ParamType;
  handleConfirm: (formValues: CommandParamFormField) => void;
  defaultValues: CommandParamFormField;
}

export default function EditCommandParamButton({
  paramType,
  handleConfirm,
  defaultValues,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        variant="link"
        size="sm"
        aria-label="edit"
        icon={<PencilFilledIcon size="14px" color="grayAlternatives.300" />}
        onClick={onOpen}
      />
      <CommandParamModal
        isEdit
        type={paramType}
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={defaultValues}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
