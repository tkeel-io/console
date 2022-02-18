import { Row } from 'react-table';
import { Center } from '@chakra-ui/react';

import IndeterminateCheckbox from './IndeterminateCheckbox';

type Props<D extends object> = {
  row: Row<D>;
};

function SelectCell<D extends object>({ row }: Props<D>) {
  return (
    <Center id={row.id}>
      <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    </Center>
  );
}

export default SelectCell;
