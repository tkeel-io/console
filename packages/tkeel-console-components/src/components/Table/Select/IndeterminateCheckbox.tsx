import { forwardRef, MutableRefObject, useEffect, useRef } from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';

const IndeterminateCheckbox = forwardRef(
  (
    { indeterminate, ...rest }: TableToggleAllRowsSelectedProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      (
        resolvedRef as MutableRefObject<HTMLInputElement>
      ).current.indeterminate = Boolean(indeterminate);
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

export default IndeterminateCheckbox;
