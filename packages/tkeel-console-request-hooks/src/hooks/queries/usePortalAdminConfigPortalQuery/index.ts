import { DEFAULT_PORTAL_ADMIN_CONFIG } from '@tkeel/console-constants';
import { usePortalQuery } from '@tkeel/console-hooks';

type ApiData = {
  client: {
    themeName: 'tkeel-light' | 'qingcloud-light';
    documentTitle: string;
    favicon: string;
    logoMark: string;
    logoTypeLight: string;
    logoTypeDark: string;
    pages: {
      Login: {
        backgroundImage: string;
        title: string;
        titlePart2: string;
        subTitle: string;
      };
    };
  };
};

export default function usePortalAdminConfigPortalQuery() {
  let config;
  const result = usePortalQuery<ApiData>({
    url: '/config/v1/portal-admin',
    method: 'GET',
    axiosRequestConfig: {
      baseURL: '/api',
    },
    extras: {
      isWithToken: false,
      handleNoAuth: false,
      handleApiError: false,
      handleAxiosError: false,
    },
  });
  const { data, isError, isSuccess } = result;

  if (isSuccess) {
    config = data;
  }

  if (isError) {
    config = DEFAULT_PORTAL_ADMIN_CONFIG;
  }

  return { ...result, config: config as ApiData | undefined };
}
