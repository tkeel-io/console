import { useDisclosure } from '@chakra-ui/react';

import { Documents } from '@tkeel/console-business-components';
import { MoreActionButton } from '@tkeel/console-components';
import { ShutdownFilledIcon } from '@tkeel/console-icons';

export default function OpenDocsButton() {
  const { isOpen, onOpen } = useDisclosure();

  return (
    <>
      <MoreActionButton
        title="OpenDocs"
        icon={<ShutdownFilledIcon />}
        onClick={onOpen}
      />
      {isOpen && <Documents />}
    </>
  );
}
