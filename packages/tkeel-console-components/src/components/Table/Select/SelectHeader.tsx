import { UseRowSelectInstanceProps } from 'react-table';
import { Center } from '@chakra-ui/react';

import IndeterminateCheckbox from './IndeterminateCheckbox';

interface Props<D extends object> extends UseRowSelectInstanceProps<D> {
  onSelectAll: () => void;
}

function SelectHeader<D extends object>({
  getToggleAllPageRowsSelectedProps,
}: Props<D>) {
  const selectedProps = getToggleAllPageRowsSelectedProps();
  return (
    <Center
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <IndeterminateCheckbox {...selectedProps} />
    </Center>
  );
}

export default SelectHeader;
