import { useDisclosure } from '@chakra-ui/react';

import { IconWrapper } from '@tkeel/console-business-components';
import { Tooltip } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import AttributesValueModal from '../AttributesValueModal';

interface Props {
  defaultValue: string;
  onSubmit: (value: string, cb?: () => void) => void;
}

export default function AutoRelationButton({ onSubmit, defaultValue }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Tooltip label="编辑属性值">
        <IconWrapper bg="blue.50">
          <PencilFilledIcon
            size={20}
            color="green.300"
            style={{ cursor: 'pointer' }}
            onClick={onOpen}
          />
        </IconWrapper>
      </Tooltip>
      {isOpen && (
        <AttributesValueModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={onSubmit}
          defaultValue={defaultValue}
        />
      )}
    </>
  );
}
