import { DEFAULT_PORTAL_TENANT_CONFIG } from '@tkeel/console-constants';
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
        subTitle: string;
      };
      SetPassword: {
        backgroundImage: string;
        brandName: string;
        title: string;
        subTitle: string;
      };
    };
  };
};

export default function usePortalAdminConfigQuery() {
  let config;
  const result = usePortalQuery<ApiData>({
    url: '/config/v1/portal-tenant',
    method: 'GET',
    axiosRequestConfig: {
      baseURL: '/api',
    },
    extras: {
      isWithToken: false,
      handleNoAuth: false,
    },
  });

  const { data, isError, isSuccess } = result;

  if (isSuccess) {
    config = data;
  }

  if (isError) {
    config = DEFAULT_PORTAL_TENANT_CONFIG;
  }

  return { ...result, config: config as ApiData | undefined };
}
