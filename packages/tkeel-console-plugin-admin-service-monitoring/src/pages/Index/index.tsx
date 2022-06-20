import { Flex } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { MonitorTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import Table from './components/Table';

export default function Index() {
  const documents = plugin.getPortalDocuments();

  return (
    <Flex flexDirection="column" flex="1" overflowY="hidden">
      <PageHeader
        icon={<MonitorTwoToneIcon />}
        name="服务监控"
        desc="服务监控提供平台内各项组件和插件的健康状态监控，可以查看当前平台的健康状态和运行时间，能够帮助用户监测平台的状况和及时定位问题。"
        documentsPath={documents.config.paths.adminGuide.serviceMonitoring}
      />
      <Flex
        flexDirection="column"
        flex="1"
        overflowY="hidden"
        paddingTop="16px"
      >
        <Table />
      </Flex>
    </Flex>
  );
}
