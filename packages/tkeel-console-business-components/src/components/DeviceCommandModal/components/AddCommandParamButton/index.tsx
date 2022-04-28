import { HStack, Text, useDisclosure } from '@chakra-ui/react';

import { AddFilledIcon } from '@tkeel/console-icons';

import CommandParamModal from '../CommandParamModal';
import { CommandParamFormField, ParamType } from '../CommandParamModal/types';

interface Props {
  type: ParamType;
  handleConfirm: (formValues: CommandParamFormField) => void;
}

export default function AddCommandParamButton({ type, handleConfirm }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <HStack
        pos="absolute"
        right="0"
        top="4px"
        w="46px"
        fontSize="12px"
        spacing="4px"
        cursor="pointer"
        color="grayAlternatives.300"
        onClick={onOpen}
      >
        <AddFilledIcon size="14px" />
        <Text>添加</Text>
      </HStack>
      <CommandParamModal
        type={type}
        isOpen={isOpen}
        onClose={onClose}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
