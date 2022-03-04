import { Flex, Text, useDisclosure } from '@chakra-ui/react';

import { MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  HumanCircleTwoToneIcon,
} from '@tkeel/console-icons';

import useAuthenticateTokenQuery from '@/tkeel-console-portal-tenant/hooks/queries/useAuthenticateTokenQuery';

import LogoutTenantButton from './LogoutTenantButton';
import LogoutUserButton from './LogoutUserButton';
import ModifyPasswordButton from './ModifyPasswordButton';

export default function UserActionMenus() {
  const primaryColor = useColor('primary');
  const primarySub2 = useColor('primarySub2');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useAuthenticateTokenQuery();
  const username = userInfo?.username;

  return (
    <MoreAction
      element={
        <Flex
          alignItems="center"
          cursor="pointer"
          _hover={{
            '& > svg': {
              fill: `${primaryColor} !important`,
              color: `${primarySub2} !important`,
            },
            '& > p': {
              color: primaryColor,
            },
          }}
        >
          <HumanCircleTwoToneIcon
            size="24px"
            color={isOpen ? primaryColor : ''}
            twoToneColor={isOpen ? primarySub2 : ''}
          />
          <Text
            marginLeft="8px"
            fontSize="12px"
            lineHeight="24px"
            color={isOpen ? primaryColor : 'gray.600'}
          >
            {username}
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
        <ModifyPasswordButton key="modify-password" />,
        <LogoutUserButton key="logout-user" />,
        <LogoutTenantButton key="logout-tenant" />,
      ]}
      onActionListOpen={onOpen}
      onActionListClose={onClose}
    />
  );
}
