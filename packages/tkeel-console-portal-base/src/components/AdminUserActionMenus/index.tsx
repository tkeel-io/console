import { Flex, useDisclosure } from '@chakra-ui/react';

import { MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
  HumanFilledIcon,
} from '@tkeel/console-icons';

import ModifyPasswordButton from './ModifyPasswordButton';

export default function AdminUserActionMenus() {
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
      buttons={[<ModifyPasswordButton key="modify-password" />]}
      onActionListOpen={onOpen}
      onActionListClose={onClose}
    />
  );
}
