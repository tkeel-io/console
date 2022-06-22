import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { notificationTypeArr } from './constants';

interface Props {
  info: {
    email: string[];
  };
}

export default function InfoPanel({ info }: Props) {
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
        <TabPanel display="flex" flexWrap="wrap" padding="20px 20px 12px">
          {info.email.map((item) => (
            <Text
              key={item}
              width="50%"
              marginBottom="8px"
              color="grayAlternatives.700"
              fontSize="12px"
              fontWeight="500"
              lineHeight="24px"
            >
              {item}
            </Text>
          ))}
        </TabPanel>
        <TabPanel>钉钉</TabPanel>
        <TabPanel>企业微信</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
