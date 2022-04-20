import { Button, useDisclosure } from '@chakra-ui/react';

import { CaretRightFilledIcon } from '@tkeel/console-icons';
import { CommandItem, CommandValue } from '@tkeel/console-types';

import CallCommandModal from '../CallCommandModal';

interface Props {
  data: CommandItem;
  uid: string;
  online: boolean;
  commandValues: CommandValue;
}

export default function CallCommandButton({
  data,
  uid,
  online,
  commandValues,
}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button
        p="6px 12px 6px 8px"
        borderRadius="4px"
        borderColor="primary"
        borderStyle="solid"
        boxShadow="none"
        bg="primarySub"
        borderWidth="1px"
        h="28px"
        fontSize="12px"
        color="primary"
        leftIcon={<CaretRightFilledIcon color="primary" />}
        _hover={{ background: 'primarySub' }}
        _active={{ background: 'primarySub' }}
        onClick={onOpen}
        isDisabled={!online}
      >
        调用
      </Button>
      <CallCommandModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        uid={uid}
        commandValues={commandValues}
      />
    </>
  );
}
