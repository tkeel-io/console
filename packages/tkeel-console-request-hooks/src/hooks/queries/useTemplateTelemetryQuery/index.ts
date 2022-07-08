import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'GET';

interface RequestParams {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
  id?: string;
}

enum TelemetryType {
  Int = 'int',
  Float = 'float',
  Double = 'double',
  Bool = 'bool',
  Enum = 'enum',
}

interface TelemetryField {
  define: Record<string, unknown>;
  description: string;
  id: string;
  name: string;
  type: TelemetryType;
  last_time: number;
}

export interface TemplateTelemetryFields {
  [propName: string]: TelemetryField;
}

interface ApiData {
  '@type': string;
  templateTeleObject: {
    configs?: {
      telemetry?: {
        define?: {
          fields?: TemplateTelemetryFields;
        };
      };
    };
  };
}

interface Props {
  id: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestParams>
  ) => unknown;
  enabled?: boolean;
}

export default function useTemplateTelemetryQuery({
  id,
  onSuccess,
  enabled = true,
}: Props) {
  const url = `/tkeel-device/v1/templates/${id}/telemetry`;

  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
      enabled: !!id && enabled,
    },
  });

  const telemetry =
    data?.templateTeleObject?.configs?.telemetry?.define?.fields ?? {};
  return { telemetry, data, ...rest };
}
