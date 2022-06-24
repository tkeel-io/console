import type { JSONSchemaType } from 'ajv';

import { useQuery } from '@tkeel/console-hooks';

interface Data {
  [propName: string]: number | string;
}

type Schema = JSONSchemaType<Data>;

interface AipData {
  '@type': string;
  schema: Schema;
}

// TODO: MOCK
const MOCK_SCHEMA: JSONSchemaType<Data> = {
  type: 'object',
  properties: {
    keel_api_request_limit: {
      type: 'number',
      title: '接口请求次数最大限制',
      description: 'api请求最大次数,0 表示无限制',
      default: 0,
      multipleOf: 1,
      minimum: 0,
      maximum: 0,
    },
    a: {
      type: 'number',
      title: '接口请求次数最大限制',
      description: 'api请求最大次数,0 表示无限制',
      default: 0,
      multipleOf: 1,
      minimum: 0,
      maximum: 0,
    },
  },
  required: ['keel_api_request_limit', 'a'],
  additionalProperties: false,
};

export type { Data, Schema };

export default function useProfileSchemaQuery() {
  const result = useQuery<AipData>({
    url: '/rudder/v1/profile/schema',
    method: 'GET',
  });
  // const schema = result.data?.schema ?? {};

  let schema;
  if (result.isSuccess) {
    schema = MOCK_SCHEMA;
  }

  return { ...result, schema };
}
