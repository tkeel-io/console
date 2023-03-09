import { useDisclosure } from '@chakra-ui/react';

import { TelemetryItem } from '@tkeel/console-types';

import TelemetryDetailDrawer from '../TelemetryDetailDrawer';
import Button from './Button';

interface TelemetryTableItem extends TelemetryItem {
  value?: string | number | boolean;
}

type Props = {
  defaultValues: TelemetryTableItem;
};

export function TelemetryDetailButton({ defaultValues }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} />
      <TelemetryDetailDrawer
        isOpen={isOpen}
        onClose={onClose}
        telemetryInfo={defaultValues}
      />
    </>
  );
}

export { default as TelemetryDetailButtonWithoutDrawer } from './Button';
