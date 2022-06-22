import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  StyleProps,
  Text,
} from '@chakra-ui/react';

import { Empty } from '@tkeel/console-components';
import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';
import { useAlarmNoticeGroupsQuery } from '@tkeel/console-request-hooks';

import { notificationTypeArr } from './constants';
import InfoPanel from './InfoPanel';

interface Props {
  noticeId: string;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function NotificationObjectsInfoCard({
  noticeId,
  styles,
}: Props) {
  const { alarmNoticeGroups, isFetched } = useAlarmNoticeGroupsQuery({
    noticeId,
  });

  return (
    <Flex
      flexDirection="column"
      padding="20px 20px 8px"
      backgroundColor="gray.100"
      {...styles?.wrapper}
    >
      {(() => {
        if (noticeId && !isFetched) {
          return null;
        }

        if (alarmNoticeGroups.length === 0) {
          return <Empty type="component" />;
        }

        return (
          <Accordion allowToggle defaultIndex={0}>
            {alarmNoticeGroups.map((group) => {
              const emailAddressArr = group.emailAddress.split(',');
              return (
                <AccordionItem
                  key={group.groupName}
                  marginBottom="12px"
                  border="none"
                >
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
                          平台运维部门
                        </Text>
                        <Flex alignItems="center">
                          <HStack marginRight="40px" spacing="18px">
                            {notificationTypeArr.map(
                              ({ value, icon: Icon, disabled }) => (
                                <Flex
                                  key={value}
                                  alignItems="center"
                                  opacity={disabled ? 0.5 : 1}
                                >
                                  <Icon color="grayAlternatives.300" />
                                  <Text
                                    marginLeft="4px"
                                    color="gray.800"
                                    fontSize="12px"
                                  >
                                    {value === 'mail'
                                      ? emailAddressArr.length
                                      : 0}
                                  </Text>
                                </Flex>
                              )
                            )}
                          </HStack>
                          {isExpanded ? (
                            <ChevronUpFilledIcon />
                          ) : (
                            <ChevronDownFilledIcon />
                          )}
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
                        <InfoPanel info={{ email: emailAddressArr }} />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
        );
      })()}
    </Flex>
  );
}
