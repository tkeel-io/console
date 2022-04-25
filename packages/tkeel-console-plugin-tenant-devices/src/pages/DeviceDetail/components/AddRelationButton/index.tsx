import { Button, useDisclosure } from '@chakra-ui/react';

import { AddFilledIcon } from '@tkeel/console-icons';

import DeviceMappingModal from '../DeviceMappingModal';

interface Props {
  uid: string;
}
export default function AddRelationButton({ uid }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button
        padding="4px 8px"
        height="28px"
        boxShadow="none"
        bg="gray.50"
        fontSize="12px"
        borderRadius="4px"
        color="grayAlternatives.300"
        leftIcon={<AddFilledIcon color="grayAlternatives.300" />}
        border="1px solid"
        borderColor="grayAlternatives.50"
        _hover={{ background: 'white' }}
        _active={{ background: 'white' }}
        onClick={onOpen}
      >
        绑定关系
      </Button>
      <DeviceMappingModal
        type="telemetry"
        isOpen={isOpen}
        onClose={onClose}
        uid={uid}
        onConfirm={() => {}}
      />
    </>
  );
}
