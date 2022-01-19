import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Editor } from '@tkeel/console-components';

import BasicInfo from './BasicInfo';
import CustomTab from './CustomTab';
import DeveloperInfo from './DeveloperInfo';
import EnablePluginList from './EnablePluginList';
import Introduce from './Introduce';

import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';

function Detail() {
  const params = useParams();
  // eslint-disable-next-line no-console
  console.log('Detail ~ params.id', params.id);
  const { pluginDetail } = usePluginDetailQuery({
    repoName: 'tkeel-default',
    installerName: 'keel',
    installerVersion: '0.1.0',
  });

  return (
    <Flex height="100%" paddingBottom="20px" justifyContent="space-between">
      <Box width="360px" flexShrink="0">
        <BasicInfo data={pluginDetail} />
        <DeveloperInfo />
      </Box>
      <Tabs display="flex" flexDirection="column" marginLeft="20px" flex="1">
        <TabList
          padding="8px"
          height="48px"
          border="none"
          borderRadius="4px"
          backgroundColor="gray.800"
        >
          <CustomTab>启用列表</CustomTab>
          <CustomTab>说明</CustomTab>
          <CustomTab>参数</CustomTab>
        </TabList>
        <TabPanels marginTop="16px" flex="1" overflow="hidden">
          <TabPanel padding="0">
            <Introduce />
          </TabPanel>
          <TabPanel height="100%" padding="24px" backgroundColor="white">
            <Editor
              width="100%"
              height="100%"
              language="yaml"
              value={atob(pluginDetail?.configuration || '')}
              readOnly
            />
          </TabPanel>
          <TabPanel padding="0" height="100%">
            <EnablePluginList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
