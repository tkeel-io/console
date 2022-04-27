import { Base64 } from 'js-base64';

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
  const rawValue = Base64.decode(value);
  if (type === 'text') {
    if (hasJsonStructure(rawValue)) {
      try {
        return JSON.stringify(JSON.parse(rawValue), null, 2);
      } catch {
        return rawValue;
      }
    }
    return rawValue;
  }

  if (type === 'hex') {
    let val = '';
    const { length } = rawValue;
    if (length === 0) return '';
    for (let i = 0; i < length; i += 1) {
      val += rawValue.codePointAt(i)?.toString(16) ?? '';
    }
    return val;
  }

  return rawValue;
};
