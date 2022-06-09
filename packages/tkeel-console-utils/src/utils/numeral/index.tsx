import numeral from 'numeral';
import type { ReactNode } from 'react';

interface FormatOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any;
  formatter?: string;
}

export function format({ input, formatter }: FormatOptions) {
  return numeral(input).format(formatter);
}

interface FormatReactNodeOptions {
  input: ReactNode;
  formatter?: boolean | string;
}

export function formatReactNode({
  input,
  formatter = true,
}: FormatReactNodeOptions) {
  if (formatter === false) {
    return input;
  }

  if (formatter === true) {
    return format({ input });
  }

  return format({ input, formatter });
}
