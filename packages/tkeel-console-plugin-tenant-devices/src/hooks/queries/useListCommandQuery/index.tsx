import { useQuery } from '@tkeel/console-hooks';
import { CommandItem } from '@tkeel/console-types';

const method = 'GET';

interface ApiData {
  '@type': string;
  templateCmdObject: {
    configs: {
      commands: {
        define: {
          fields: {
            [propName: string]: CommandItem;
          };
        };
      };
    };
  };
}
interface RequestParams {
  uid: string;
}

export default function useListCommandQuery({ uid }: RequestParams) {
  const url = `/tkeel-device/v1/templates/${uid}/command`;
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const commandList =
    data?.templateCmdObject?.configs?.commands?.define?.fields ?? [];
  return { commandList, data, ...rest };
}
