import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import ModifyPolicyModal from '../ModifyPolicyModal';

const handleConfirm = () => {};
export default function ModifyPolicyButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MoreActionButton
        icon={<PencilFilledIcon size="12px" color="grayAlternatives.300" />}
        title="修改告警策略"
        onClick={onOpen}
      />
      {isOpen && (
        <ModifyPolicyModal
          isOpen={isOpen}
          isConfirmButtonLoading={false}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
