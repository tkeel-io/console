import { Flex, HStack, Text } from '@chakra-ui/react';

import { Tips } from '@tkeel/console-components';

import AlarmLevelTag from './AlarmLevelTag';
import { ALARM_LEVEL_MAP } from './constants';

export default function AlarmLevelTips() {
  return (
    <Tips
      iconColor="grayAlternatives.300"
      label={
        <Flex flexDirection="column">
          <Text color="gray.700" fontSize="12px" lineHeight="24px">
            告警级别从高到低分为：
          </Text>
          <HStack marginTop="4px" spacing="6px">
            {Object.values(ALARM_LEVEL_MAP).map((level) => (
              <AlarmLevelTag key={level} level={level} />
            ))}
          </HStack>
        </Flex>
      }
    />
  );
}
