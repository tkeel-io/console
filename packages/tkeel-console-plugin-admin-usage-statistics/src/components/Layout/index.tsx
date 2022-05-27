import { Box, Flex } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { PageHeader, SegmentedControl } from '@tkeel/console-components';
import { ServerNodeTwoToneIcon } from '@tkeel/console-icons';

import { ROUTES } from '@/tkeel-console-plugin-admin-usage-statistics/constants/routes';

export default function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const lastSlashIndex = pathname.lastIndexOf('/');
  const defaultValue =
    pathname.slice(Math.max(0, lastSlashIndex + 1)) || ROUTES[0].value;

  // TODO: need docs

  return (
    <Flex flexDirection="column" flex="1" overflowY="hidden">
      <PageHeader
        icon={<ServerNodeTwoToneIcon />}
        name="用量统计"
        desc="了解资源使用情况，查询实时性能指标"
      />
      <Box padding="12px 0 14px">
        <SegmentedControl
          options={ROUTES}
          defaultValue={defaultValue}
          onChange={(nextValue) =>
            navigate(nextValue as string, { replace: true })
          }
        />
      </Box>
      <Box flex="1" overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
