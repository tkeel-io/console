import { Flex, Text } from '@chakra-ui/react';
import { MoreAction, MoreActionButton } from '@tkeel/console-components';
import { ChevronDownFilledIcon } from '@tkeel/console-icons';

export default function StatusSelect() {
  return (
    <MoreAction
      element={
        <Flex>
          <Text>全部状态</Text>
          <ChevronDownFilledIcon />
        </Flex>
      }
      buttons={[
        <MoreActionButton key="online" />,
        <MoreActionButton key="offline" />,
      ]}
    />
  );
}
