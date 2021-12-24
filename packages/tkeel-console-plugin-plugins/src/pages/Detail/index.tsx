import React from 'react';
// import { useParams } from 'react-router-dom';
import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import BasicInfo from './BasicInfo';
import CustomTab from './CustomTab';

function Detail() {
  // const params = useParams();
  // eslint-disable-next-line no-console
  // console.log('Detail ~ params.id', params.id);

  return (
    <Flex paddingBottom="20px" justifyContent="space-between">
      <BasicInfo />
      <Tabs marginLeft="20px" flex="1">
        <TabList
          padding="8px"
          height="48px"
          border="none"
          borderRadius="4px"
          backgroundColor="gray.800"
        >
          <CustomTab>说明</CustomTab>
          <CustomTab>参数</CustomTab>
          <CustomTab>启用列表</CustomTab>
        </TabList>
        <TabPanels marginTop="16px">
          <TabPanel padding="24px" backgroundColor="white">
            功能点
          </TabPanel>
          <TabPanel padding="16px" backgroundColor="white">
            参数
          </TabPanel>
          <TabPanel padding="0" backgroundColor="white">
            列表
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
