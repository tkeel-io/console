import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';

import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';
import type { AlarmNoticeGroup } from '@tkeel/console-request-hooks';
import { useAlarmMailsQuery } from '@tkeel/console-request-hooks';

import { notificationTypeArr } from './constants';
import InfoPanel from './InfoPanel';

interface Props {
  group: AlarmNoticeGroup;
}

export default function NoticeGroupItem({ group }: Props) {
  const emailAddressArr = group.emailAddress?.split(',') || [];
  const { mails } = useAlarmMailsQuery({
    params: { noticeId: group.noticeId },
  });

  return (
    <AccordionItem key={group.groupName} marginBottom="12px" border="none">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            justifyContent="space-between"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="grayAlternatives.100"
            borderRadius="4px"
            backgroundColor="white"
            _focus={{ boxShadow: 'none' }}
          >
            <Text color="gray.700" fontSize="12px" fontWeight="500">
              {group.groupName}
            </Text>
            <Flex alignItems="center">
              <HStack marginRight="40px" spacing="18px">
                {notificationTypeArr.map(({ value, icon: Icon, disabled }) => (
                  <Flex
                    key={value}
                    alignItems="center"
                    opacity={disabled ? 0.5 : 1}
                  >
                    <Icon color="grayAlternatives.300" />
                    <Text marginLeft="4px" color="gray.800" fontSize="12px">
                      {value === 'mail' ? emailAddressArr.length : 0}
                    </Text>
                  </Flex>
                ))}
              </HStack>
              {isExpanded ? <ChevronUpFilledIcon /> : <ChevronDownFilledIcon />}
            </Flex>
          </AccordionButton>
          <AccordionPanel
            marginTop="4px"
            padding="0"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.200"
            borderRadius="4px"
            backgroundColor="gray.50"
          >
            <InfoPanel info={{ email: mails }} />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}
