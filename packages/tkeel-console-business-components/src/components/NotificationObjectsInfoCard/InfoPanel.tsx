import {
  Flex,
  StyleProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { AlarmMail } from '@tkeel/console-request-hooks';

import { notificationTypeArr } from './constants';

interface Props {
  info: {
    email: AlarmMail[];
  };
}

export default function InfoPanel({ info }: Props) {
  const textStyle: StyleProps = {
    flex: 1,
    color: 'grayAlternatives.700',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '24px',
  };

  return (
    <Tabs index={0}>
      <TabList paddingLeft="20px" height="34px" borderBottomWidth="1px">
        {notificationTypeArr.map(({ label, value, disabled }) => (
          <Tab
            key={value}
            height="34px"
            padding="6px 20px 0"
            color="gray.700"
            fontSize="12px"
            fontWeight="600"
            borderBottomWidth="1px"
            isDisabled={disabled}
            _selected={{
              color: 'primary',
              borderBottomColor: 'primary',
            }}
            _focus={{ boxShadow: 'none', outline: 'none' }}
          >
            {label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel padding="20px 20px 12px" maxHeight="200px" overflowY="auto">
          {info.email.map(({ id, emailAddress, userName }) => (
            <Flex key={id} marginBottom="8px" flex="1">
              <Text {...textStyle}>{emailAddress}</Text>
              <Text {...textStyle}>{userName}</Text>
            </Flex>
          ))}
        </TabPanel>
        <TabPanel>钉钉</TabPanel>
        <TabPanel>企业微信</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
