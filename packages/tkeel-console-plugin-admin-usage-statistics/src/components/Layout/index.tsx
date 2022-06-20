import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { PageHeader, SegmentedControl } from '@tkeel/console-components';
import { ServerNodeTwoToneIcon } from '@tkeel/console-icons';

// import { plugin } from '@tkeel/console-utils';
import { ROUTES } from '@/tkeel-console-plugin-admin-usage-statistics/constants/routes';

import TenantSelector, { ALL_TENANTS_OPTION } from '../TenantSelector';

export default function Layout() {
  // const documents = plugin.getPortalDocuments();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const lastSlashIndex = pathname.lastIndexOf('/');
  const value =
    pathname.slice(Math.max(0, lastSlashIndex + 1)) || ROUTES[0].value;

  const [tenantId, setTenantId] = useState(ALL_TENANTS_OPTION.value);

  return (
    <Flex flexDirection="column" flex="1" overflowY="hidden">
      <PageHeader
        icon={<ServerNodeTwoToneIcon />}
        name="用量统计"
        desc="了解资源使用情况，查询实时性能指标"
        // TODO: need docs
        // documentsPath={documents.config.paths.adminGuide.serviceMonitoring}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding="12px 0 14px"
      >
        <SegmentedControl
          options={ROUTES}
          value={value}
          onChange={(nextValue) =>
            navigate(nextValue as string, { replace: true })
          }
        />
        <Box paddingLeft="24px">
          <TenantSelector value={tenantId} onChange={setTenantId} />
        </Box>
      </Flex>
      <Box
        flex="1"
        overflowY="auto"
        borderRadius="4px"
        backgroundColor="gray.100"
        boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
        padding="12px 20px"
      >
        <Outlet context={{ tenantId }} />
      </Box>
    </Flex>
  );
}
