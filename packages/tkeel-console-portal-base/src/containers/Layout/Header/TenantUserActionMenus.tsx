import { Flex, Text } from '@chakra-ui/react';
import { MoreAction, MoreActionButton } from '@tkeel/console-components';
import {
  ChevronDownFilledIcon,
  // ChevronUpFilledIcon,
  HumanFilledIcon,
  KeyFilledIcon,
  LeftRightFilledIcon,
  ShutdownFilledIcon,
} from '@tkeel/console-icons';

export default function TenantUserActionMenus() {
  return (
    <MoreAction
      element={
        <Flex alignItems="center" cursor="pointer">
          <HumanFilledIcon size="24px" />
          <Text
            marginLeft="8px"
            fontSize="12px"
            lineHeight="24px"
            color="gray.600"
          >
            admin
          </Text>
          <ChevronDownFilledIcon size="16px" style={{ marginLeft: '8px' }} />
        </Flex>
      }
      buttons={[
        <MoreActionButton
          key={0}
          title="修改密码"
          icon={<KeyFilledIcon />}
          onClick={() => {}}
        />,
        <MoreActionButton
          key={1}
          title="退出登录"
          icon={<ShutdownFilledIcon />}
          onClick={() => {}}
        />,
        <MoreActionButton
          key={2}
          title="切换空间"
          icon={<LeftRightFilledIcon />}
          onClick={() => {}}
        />,
      ]}
    />
  );
}
