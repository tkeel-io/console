import { values } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { AttributeItem } from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
  id?: string;
};

export interface Attribute {
  [propName: string]: AttributeItem;
}

export interface ApiData {
  '@type': string;
  templateAttrObject: {
    configs: {
      attributes: {
        define: {
          fields: Attribute;
        };
      };
    };
  };
}

export default function useListTemplateAttributeQuery({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestParams>
  ) => unknown;
}) {
  const url = `/tkeel-device/v1/templates/${id}/attribute`;

  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
  const attributeList =
    values(
      data?.templateAttrObject?.configs?.attributes?.define?.fields ?? {}
    ) || [];
  return { attributeList, data, ...rest };
}
