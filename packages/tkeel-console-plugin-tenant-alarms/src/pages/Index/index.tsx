import { Flex, Stack, Text } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { MethodIcon } from '@tkeel/console-icons';

import AlarmsTable from './components/AlarmsTable';

export default function Index() {
  return (
    <Stack h="100%">
      <PageHeader
        icon={<MethodIcon size={40} />}
        name="告警记录"
        // documentsPath={documents.config.paths.adminGuide.plugins}
        desc={
          <Flex lineHeight="1" alignItems="center">
            <Text>
              从设备接入到平台服务所有告警记录的发现、处理及关联信息查询，同时支持各类告警的设置。请注意，告警记录保存时间为
            </Text>
            <Text
              color="white"
              backgroundColor="primary"
              padding="3px"
              margin="0 2px"
              fontWeight="bold"
              borderRadius="2px"
            >
              30
            </Text>
            <Text>天。</Text>
          </Flex>
        }
      />
      <AlarmsTable />
    </Stack>
  );
}
