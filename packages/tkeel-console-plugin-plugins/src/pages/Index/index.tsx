import React from 'react';
import {
  Button,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { PageHeader } from '@tkeel/console-components';
import { AddFilledIcon, AppsAddFilledIcon } from '@tkeel/console-icons';

import Content from './Content';
import CustomTab from './CustomTab';

function Index(): JSX.Element {
  return (
    <Flex flexDirection="column" height="100%">
      <PageHeader
        icon={<AppsAddFilledIcon size={26} />}
        name="插件管理"
        desc="一段描述文字"
      />
      <Tabs
        position="relative"
        display="flex"
        flexDirection="column"
        flex="1"
        overflow="hidden"
        marginTop="16px"
      >
        <Button
          position="absolute"
          right="2px"
          top="2px"
          size="md"
          leftIcon={<AddFilledIcon color="white" />}
        >
          创建插件源
        </Button>
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
        <TabPanels flex="1" overflow="hidden" marginTop="16px">
          <TabPanel height="100%" padding="0">
            <Content />
          </TabPanel>
          <TabPanel height="100%" padding="0">
            <Content />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Index;
