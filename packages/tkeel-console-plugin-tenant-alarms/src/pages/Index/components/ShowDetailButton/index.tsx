import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';

import DetailDrawer from '../ShowDetailDrawer';

// import { plugin } from '@tkeel/console-utils';

function ShowDetailButton() {
  // const toast = plugin.getPortalToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MoreActionButton
        onClick={onOpen}
        icon={<EyeFilledIcon color="grayAlternatives.300" size="12px" />}
        title="查看详情"
      />
      <DetailDrawer
        // isConfirmButtonLoading={isLoading}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default ShowDetailButton;
