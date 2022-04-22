import { Checkbox } from '@chakra-ui/react';
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';

const IndeterminateCheckbox = forwardRef(
  (
    { indeterminate, checked, ...rest }: TableToggleAllRowsSelectedProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const defaultRef = useRef<HTMLInputElement | null>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      (
        resolvedRef as MutableRefObject<HTMLInputElement>
      ).current.indeterminate = Boolean(indeterminate);
    }, [resolvedRef, indeterminate]);

    return (
      <Checkbox
        ref={resolvedRef}
        isIndeterminate={indeterminate}
        isChecked={checked}
        size="sm"
        colorScheme="brand"
        css={`
          > span:first-of-type {
            box-shadow: unset;
          }
        `}
        {...rest}
      />
    );
  }
);

export default IndeterminateCheckbox;
