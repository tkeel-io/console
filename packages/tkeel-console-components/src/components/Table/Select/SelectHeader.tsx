import { Center } from '@chakra-ui/react';
import { UseRowSelectInstanceProps } from 'react-table';

import IndeterminateCheckbox from './IndeterminateCheckbox';

interface Props<D extends object> extends UseRowSelectInstanceProps<D> {
  onSelectAll: () => void;
}

function SelectHeader<D extends object>({
  getToggleAllRowsSelectedProps,
}: Props<D>) {
  const selectedProps = getToggleAllRowsSelectedProps();
  return (
    <Center width="100%" height="100%">
      <IndeterminateCheckbox {...selectedProps} />
    </Center>
  );
}

export default SelectHeader;
