import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { PageHeader, SegmentedControl } from '@tkeel/console-components';
import { Bell2TwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import { ROUTES } from '@/tkeel-console-plugin-admin-notification-configs/constants/routes';

export default function Index() {
  const documents = plugin.getPortalDocuments();
  const { pathname } = useLocation();

  const lastSlashIndex = pathname.lastIndexOf('/');
  const defaultValue =
    pathname.slice(Math.max(0, lastSlashIndex + 1)) || ROUTES[0].value;

  const [tenantId] = useState('email');
  return (
    <Flex flexDirection="column" flex="1" overflowY="hidden">
      <PageHeader
        icon={<Bell2TwoToneIcon />}
        name="通知管理"
        desc="通知管理"
        documentsPath={documents.config.paths.adminGuide.tenantIntro}
      />
      <Flex flexDirection="column" overflowY="hidden" paddingTop="16px">
        <SegmentedControl options={ROUTES} defaultValue={defaultValue} />
      </Flex>
      <Box
        flex="1"
        overflowY="auto"
        borderRadius="4px"
        backgroundColor="white"
        boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
        padding="12px 20px"
        marginTop="15px"
      >
        <Outlet context={{ tenantId }} />
      </Box>
    </Flex>
  );
}
