import { useDisclosure } from '@chakra-ui/react';
import { memo, useState } from 'react';

import { MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';

import type { AlarmItem } from '@/tkeel-console-plugin-tenant-alarms/types';

import DetailDrawer from '../ShowDetailDrawer';

// import { plugin } from '@tkeel/console-utils';
interface Props {
  details: AlarmItem;
}

function ShowDetailButton({ details }: Props) {
  // const toast = plugin.getPortalToast();
  const [enabled, setEnabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MoreActionButton
        onClick={() => {
          onOpen();
          setEnabled(true);
        }}
        icon={<EyeFilledIcon color="grayAlternatives.300" size="12px" />}
        title="查看详情"
      />

      <DetailDrawer
        enabled={enabled}
        details={details}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default memo(ShowDetailButton);
