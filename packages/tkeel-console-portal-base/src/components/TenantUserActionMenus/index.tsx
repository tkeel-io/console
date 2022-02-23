import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  HumanFilledIcon,
} from '@tkeel/console-icons';

import useOAuthAuthenticateQuery from '@/tkeel-console-portal-base/hooks/queries/useOAuthAuthenticateQuery';

import LogoutTenantButton from './LogoutTenantButton';
import LogoutUserButton from './LogoutUserButton';
import ModifyPasswordButton from './ModifyPasswordButton';

export default function TenantUserActionMenus() {
  const primaryColor = useColor('primary');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useOAuthAuthenticateQuery();
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
        <LogoutUserButton key="logout-tenant" />,
        <LogoutTenantButton key="logout-user" />,
      ]}
      onActionListOpen={onOpen}
      onActionListClose={onClose}
    />
  );
}
