import { Center } from '@chakra-ui/react';

import { RowExtended } from '@/tkeel-console-components/components/Table/types';

import IndeterminateCheckbox from './IndeterminateCheckbox';

type Props<D extends object> = {
  row: RowExtended<D>;
};

function SelectCell<D extends object>({ row }: Props<D>) {
  return (
    <Center id={row.id}>
      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    </Center>
  );
}

export default SelectCell;
