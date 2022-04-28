export function hasJsonStructure(str: string) {
  try {
    const result = JSON.parse(str) as string;
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch {
    return false;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const formatRawValue = ({
  value,
  type,
}: {
  value: string;
  type: string;
}) => {
  if (type === 'text') {
    if (hasJsonStructure(value)) {
      try {
        return JSON.stringify(JSON.parse(value), null, 2);
      } catch {
        return value;
      }
    }
    return value;
  }

  if (type === 'hex') {
    let val = '';
    const { length } = value;
    if (length === 0) return '';
    for (let i = 0; i < length; i += 1) {
      val += value.codePointAt(i)?.toString(16) ?? '';
    }
    return val;
  }

  return value;
};
