import { DEFAULT_PORTAL_TENANT_CONFIG } from '@tkeel/console-constants';
import { usePortalQuery } from '@tkeel/console-hooks';

type ApiData = {
  client: {
    documentTitle: string;
    subTitle1: string;
    subTitle2: string;
    favicon: string;
    logoMark: string;
    logoTypeLight: string;
    logoTypeDark: string;
    pages: {
      Login: {
        backgroundImage: string;
        title: string;
      };
      SetPassword: {
        backgroundImage: string;
        logo: string;
      };
    };
  };
};

export default function usePortalAdminConfigPortalQuery() {
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
      handleApiError: false,
      handleAxiosError: false,
    },
  });

  const { data, isError, isSuccess } = result;

  if (isSuccess) {
    config = data;
  }

  if (isError) {
    config = DEFAULT_PORTAL_TENANT_CONFIG;
  }

  return { ...result, config };
}
