import React from 'react';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { PageHeader, SearchInput } from '@tkeel/console-components';

import Card from './Card';

function Index(): JSX.Element {
  const pluginNum = [
    {
      name: '插件数量',
      num: 50,
    },
    {
      name: '已启用',
      num: 30,
    },
    {
      name: '未启用',
      num: 20,
    },
  ];

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
          <Tab
            width="50%"
            height="28px"
            borderRadius="22px"
            _focus={{ boxShadow: 'none' }}
            _selected={{
              backgroundColor: 'gray.800',
              color: 'white',
              border: 'none',
              margin: '0',
            }}
          >
            One
          </Tab>
        </TabList>
        <TabPanels marginTop="16px">
          <TabPanel padding="0">
            <Box
              flex="1"
              padding="17px 24px 24px"
              borderRadius="4px"
              backgroundColor="white"
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                  {pluginNum.map((item) => (
                    <Flex key={item.name} alignItems="center" marginRight="5px">
                      <Text color="gray.700" fontSize="12px" fontWeight="500">
                        {item.name}
                      </Text>
                      <Text
                        marginLeft="2px"
                        color="gray.500"
                        fontSize="12px"
                        fontWeight="500"
                      >
                        {item.num}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
                <SearchInput width="452px" />
              </Flex>
              <Flex
                marginTop="19px"
                flexWrap="wrap"
                justifyContent="space-between"
                width="100%"
              >
                <Card />
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Index;
