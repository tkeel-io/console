import { merge } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';

const PORTS = new Set(['80', '443']);

function isShowPort(port: string | number = '') {
  const value = String(port ?? '').trim();

  if (value) {
    return !PORTS.has(value);
  }

  return false;
}

function getURL(hostname: string, port?: string) {
  const hostnameString = String(hostname ?? '').trim();
  const portString = String(port ?? '').trim();
  return isShowPort(portString)
    ? `${hostnameString}:${portString}`
    : hostnameString;
}

interface ApiData {
  '@type': string;
  admin_host: string;
  tenant_host: string;
  port: string;
  docs_addr: string;
}

export default function useDeploymentConfigQuery() {
  const result = useQuery<ApiData>({
    url: '/rudder/v1/config/deployment',
    method: 'GET',
  });
  const { data } = result;
  const adminHost = data?.admin_host ?? '';
  const tenantHost = data?.tenant_host ?? '';
  const port = String(data?.port ?? '');
  const portalAdminURL = getURL(adminHost, port);
  const portalTenantURL = getURL(tenantHost, port);
  const config = merge({}, data, { portalAdminURL, portalTenantURL });

  if (process.env.NODE_ENV === 'development') {
    const mockDocsBaseURL =
      GLOBAL_PORTAL_CONFIG?.mock?.documents?.baseURL || config.docs_addr;
    const mockConfig = merge({}, config, { docs_addr: mockDocsBaseURL });

    return { config: mockConfig, ...result };
  }

  return { config, ...result };
}
