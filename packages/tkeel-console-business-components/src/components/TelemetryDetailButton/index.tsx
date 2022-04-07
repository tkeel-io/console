import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';
import { TelemetryItem } from '@tkeel/console-types';

import TelemetryDetailDrawer from '../TelemetryDetailDrawer';

interface TelemetryTableItem extends TelemetryItem {
  value?: string | number | boolean;
}

type Props = {
  defaultValues: TelemetryTableItem;
};

export default function TelemetryDetailButton({ defaultValues }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MoreActionButton
        icon={<EyeFilledIcon size="12px" color="grayAlternatives.300" />}
        title="查看详情"
        onClick={onOpen}
      />
      <TelemetryDetailDrawer
        isOpen={isOpen}
        onClose={onClose}
        telemetryInfo={defaultValues}
      />
    </>
  );
}
