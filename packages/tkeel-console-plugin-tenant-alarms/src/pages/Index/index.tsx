import { Stack } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { MethodIcon } from '@tkeel/console-icons';

import AlarmsTable from './components/AlarmsTable';

export default function Index() {
  return (
    <Stack>
      <PageHeader
        icon={<MethodIcon size={40} />}
        name="告警记录"
        // documentsPath={documents.config.paths.adminGuide.plugins}
        desc="从设备接入到平台服务所有告警记录的发现、处理及关联信息查询，同时支持各类告警的设置。"
      />
      <AlarmsTable />
    </Stack>
  );
}
