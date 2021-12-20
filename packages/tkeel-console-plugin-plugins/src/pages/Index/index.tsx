import React from 'react';
import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '@tkeel/console-components';

import Content from './Content';
import CustomTab from './CustomTab';

function Index(): JSX.Element {
  return (
    <Flex flexDir="column" height="100%">
      <PageHeader name="插件管理" desc="一段描述文字" />
      <Tabs marginTop="16px">
        <TabList
          padding="2px"
          width="254px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          backgroundColor="gray.50"
          borderRadius="22px"
        >
          <CustomTab>tKeel</CustomTab>
          <CustomTab>已安装</CustomTab>
        </TabList>
        <TabPanels marginTop="16px">
          <TabPanel padding="0">
            <Content />
          </TabPanel>
          <TabPanel padding="0">
            <Content />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Index;
