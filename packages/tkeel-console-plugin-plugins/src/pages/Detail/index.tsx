import React from 'react';
// import { useParams } from 'react-router-dom';
import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Editor } from '@tkeel/console-components';

import BasicInfo from './BasicInfo';
import CustomTab from './CustomTab';
import Introduce from './Introduce';
import mockParams from './mockParams';
// import paramsData from './mockParams';

function Detail() {
  // const params = useParams();
  // eslint-disable-next-line no-console
  // console.log('Detail ~ params.id', params.id);

  return (
    <Flex height="100%" paddingBottom="20px" justifyContent="space-between">
      <BasicInfo />
      <Tabs display="flex" flexDirection="column" marginLeft="20px" flex="1">
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
        <TabPanels marginTop="16px" flex="1" overflow="hidden">
          <TabPanel padding="16px" backgroundColor="white">
            <Introduce />
          </TabPanel>
          <TabPanel height="100%" padding="24px" backgroundColor="white">
            <Editor
              width="100%"
              height="100%"
              language="yaml"
              value={mockParams}
              readOnly
            />
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
