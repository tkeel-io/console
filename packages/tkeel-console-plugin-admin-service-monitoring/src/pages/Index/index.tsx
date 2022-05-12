import { Flex } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { MonitorTwoToneIcon } from '@tkeel/console-icons';

import Plugins from './components/Plugins';

export default function Index() {
  // TODO: docs

  return (
    <Flex flexDirection="column" flex="1">
      <PageHeader
        icon={<MonitorTwoToneIcon />}
        name="服务监控"
        desc="服务监控提供平台内各项组件和插件的健康状态监控，可以查看当前平台的健康状态和运行时间，能够帮助用户监测平台的状况和及时定位问题。"
      />
      <Flex flexDirection="column" flex="1" marginTop="16px">
        <Plugins />
      </Flex>
    </Flex>
  );
}
