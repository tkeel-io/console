import numeral from 'numeral';

interface FormatOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any;
  formatter?: string;
}

export function format({ input, formatter = '0,0' }: FormatOptions) {
  return numeral(input).format(formatter);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidFormat(input: any) {
  const type = typeof input;

  const isNumber = type === 'number';
  const isNumberString =
    type === 'string' && input !== '' && !Number.isNaN(Number(input));

  return isNumber || isNumberString;
}
