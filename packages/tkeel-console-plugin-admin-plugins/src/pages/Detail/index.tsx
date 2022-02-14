/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Editor, Empty } from '@tkeel/console-components';
import { markdown } from 'markdown';

import BasicInfo from './BasicInfo';
import CustomTab from './CustomTab';
import DeveloperInfo from './DeveloperInfo';
import EnablePluginList from './EnablePluginList';
import { MarkdownWrapper } from './index.style';

import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';
import { b64ToUTF8 } from '@/tkeel-console-plugin-admin-plugins/utils';

function Detail() {
  const { repo, name, version } = useParams();
  const { pluginDetail, refetch } = usePluginDetailQuery({
    repoName: repo || '',
    installerName: name || '',
    installerVersion: version || '',
  });

  const readme = pluginDetail?.metadata?.readme ?? '';

  return (
    <Flex height="100%" paddingBottom="20px" justifyContent="space-between">
      <Box width="360px" flexShrink="0">
        <BasicInfo data={pluginDetail} refetchDetails={refetch} />
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
          <CustomTab>说明</CustomTab>
          <CustomTab>参数</CustomTab>
          <CustomTab>启用列表</CustomTab>
        </TabList>
        <TabPanels marginTop="16px" flex="1" overflow="hidden">
          <TabPanel padding="0" height="100%" backgroundColor="white">
            {readme ? (
              <MarkdownWrapper
                padding="24px"
                dangerouslySetInnerHTML={{
                  __html: markdown.toHTML(b64ToUTF8(readme)),
                }}
              />
            ) : (
              <Empty
                title="暂无内容"
                styles={{ wrapper: { height: '100%' } }}
              />
            )}
          </TabPanel>
          <TabPanel height="100%" padding="24px" backgroundColor="white">
            <Editor
              width="100%"
              height="100%"
              language="yaml"
              value={atob(pluginDetail?.metadata?.configuration ?? '')}
              readOnly
            />
          </TabPanel>
          <TabPanel padding="0" height="100%">
            <EnablePluginList pluginName={name || ''} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
