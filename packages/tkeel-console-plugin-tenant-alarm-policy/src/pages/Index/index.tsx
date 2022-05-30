import { Flex } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { BellGearTwoToneIcon } from '@tkeel/console-icons';

export default function Index() {
  return (
    <Flex paddingTop="8px" flexDirection="column" height="100%">
      <PageHeader
        icon={<BellGearTwoToneIcon />}
        name="告警策略"
        desc="告警策略配置"
      />
    </Flex>
  );
}
