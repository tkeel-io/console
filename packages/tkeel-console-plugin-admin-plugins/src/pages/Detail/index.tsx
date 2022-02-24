import { useSearchParams } from 'react-router-dom';
import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { DeveloperInfo } from '@tkeel/console-business-components';
import {
  CustomTab,
  CustomTabList,
  Editor,
  Empty,
} from '@tkeel/console-components';
import { Base64 } from 'js-base64';
import { markdown } from 'markdown';

import BasicInfoCard from './components/BasicInfoCard';
import EnablePluginList from './components/EnablePluginList';
import { MarkdownWrapper } from './index.style';

import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';

function Detail() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';

  const { pluginDetail, refetch } = usePluginDetailQuery({
    repoName: searchParams.get('repo') || '',
    installerName: name,
    installerVersion: searchParams.get('version') || '',
  });

  const readme = pluginDetail?.metadata?.readme ?? '';
  const maintainers = pluginDetail?.maintainers ?? [];
  return (
    <Flex height="100%" paddingBottom="20px" justifyContent="space-between">
      <Box width="360px" flexShrink="0">
        <BasicInfoCard data={pluginDetail} refetchDetails={refetch} />
        <DeveloperInfo data={maintainers} />
      </Box>
      <Tabs display="flex" flexDirection="column" marginLeft="20px" flex="1">
        <CustomTabList>
          <CustomTab>说明</CustomTab>
          <CustomTab>参数</CustomTab>
          <CustomTab>启用列表</CustomTab>
        </CustomTabList>
        <TabPanels flex="1" overflow="hidden">
          <TabPanel padding="0" height="100%" backgroundColor="white">
            {readme ? (
              <MarkdownWrapper
                padding="24px"
                dangerouslySetInnerHTML={{
                  __html: markdown.toHTML(Base64.decode(readme)),
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
