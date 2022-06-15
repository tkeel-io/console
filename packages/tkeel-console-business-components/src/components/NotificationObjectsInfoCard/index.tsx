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

import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';

import { notificationTypeArr } from './constants';
import InfoPanel from './InfoPanel';

interface Props {
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function NotificationObjectsInfoCard({ styles }: Props) {
  const info = [
    {
      name: '平台运维部门',
      mail: 3,
      dingding: 0,
      wechat: 0,
    },
    {
      name: '平台运维部门',
      mail: 3,
      dingding: 0,
      wechat: 0,
    },
  ];

  return (
    <Flex
      flexDirection="column"
      padding="20px 20px 8px"
      backgroundColor="gray.100"
      {...styles?.wrapper}
    >
      <Accordion allowToggle>
        {info.map((item) => {
          return (
            <AccordionItem key={item.name} marginBottom="12px" border="none">
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
                                {item[value]}
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
                    <InfoPanel />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Flex>
  );
}
