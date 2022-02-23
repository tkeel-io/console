import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { MoreAction, MoreActionButton } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  HumanFilledIcon,
  KeyFilledIcon,
  LeftRightFilledIcon,
  ShutdownFilledIcon,
} from '@tkeel/console-icons';

export default function TenantUserActionMenus() {
  const primaryColor = useColor('primary');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MoreAction
      element={
        <Flex
          alignItems="center"
          cursor="pointer"
          _hover={{
            '& > svg': {
              fill: `${primaryColor} !important`,
            },
            '& > p': {
              color: primaryColor,
            },
          }}
        >
          <HumanFilledIcon size="24px" color={isOpen ? primaryColor : ''} />
          <Text
            marginLeft="8px"
            fontSize="12px"
            lineHeight="24px"
            color={isOpen ? primaryColor : 'gray.600'}
          >
            admin
          </Text>
          {isOpen ? (
            <ChevronUpFilledIcon
              size="16px"
              color={primaryColor}
              style={{ marginLeft: '8px' }}
            />
          ) : (
            <ChevronDownFilledIcon size="16px" style={{ marginLeft: '8px' }} />
          )}
        </Flex>
      }
      buttons={[
        <MoreActionButton
          key="modify-password"
          title="修改密码"
          icon={<KeyFilledIcon />}
          onClick={() => {}}
        />,
        <MoreActionButton
          key="logout-user"
          title="退出登录"
          icon={<ShutdownFilledIcon />}
          onClick={() => {}}
        />,
        <MoreActionButton
          key="logout-tenant"
          title="切换空间"
          icon={<LeftRightFilledIcon />}
          onClick={() => {}}
        />,
      ]}
      onActionListOpen={onOpen}
      onActionListClose={onClose}
    />
  );
}
