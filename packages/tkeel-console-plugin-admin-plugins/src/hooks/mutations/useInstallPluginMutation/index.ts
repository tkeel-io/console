import useMutation from '@/tkeel-console-plugin-admin-plugins/hooks/useMutation';
import { BriefInstallerInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

interface RequestData {
  name: string;
  version: string;
  repo: string;
  configuration: string;
  type: 1;
}

export interface ApiData {
  '@types': string;
  plugin: {
    id: string;
    status: string;
    brief_installer_info: BriefInstallerInfo;
  };
}

const url = '/rudder/v1/plugins';
const method = 'POST';

export default function useInstallPluginMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `${url}/${id}`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
