import { ColorHues } from '@chakra-ui/react';
import { Base64 } from 'js-base64';

import { useQuery } from '@tkeel/console-hooks';

type ParsedExtra = {
  theme: {
    colors: {
      primary: string;
      brand: ColorHues;
    };
  };
};

export interface ApiData {
  '@type': string;
  extra: string;
}

const url = '/rudder/v1/config/platform';
const method = 'GET';

export default function useConfigQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const extraStr = data?.extra || '';

  let parsedExtra: ParsedExtra | null = null;
  if (extraStr) {
    try {
      parsedExtra = JSON.parse(Base64.decode(extraStr)) as ParsedExtra;
    } catch {
      //
    }
  }

  return { extra: parsedExtra, data, ...rest };
}
