import { Flex, useDisclosure } from '@chakra-ui/react';

import { MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  HumanCircleTwoToneIcon,
} from '@tkeel/console-icons';

import LogoutButton from './LogoutButton';
import ModifyPasswordButton from './ModifyPasswordButton';

export default function UserActionMenus() {
  const primaryColor = useColor('primary');
  const primarySub2 = useColor('primarySub2');
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
        <LogoutButton key="logout" />,
      ]}
      onActionListOpen={onOpen}
      onActionListClose={onClose}
    />
  );
}
