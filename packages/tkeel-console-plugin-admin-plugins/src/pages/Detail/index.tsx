import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { markdown } from 'markdown';
import { useSearchParams } from 'react-router-dom';

import { DeveloperInfo } from '@tkeel/console-business-components';
import {
  AceEditor,
  CustomTab,
  CustomTabList,
  Empty,
} from '@tkeel/console-components';

import usePluginDetailQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/usePluginDetailQuery';

import BasicInfoCard from './components/BasicInfoCard';
import EnablePluginList from './components/EnablePluginList';
import { MarkdownWrapper } from './index.style';

function Detail() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';

  const { pluginDetail, isSuccess, refetch } = usePluginDetailQuery({
    repoName: searchParams.get('repo') || '',
    installerName: name,
    installerVersion: searchParams.get('version') || '',
  });

  const readme = pluginDetail?.metadata?.readme ?? '';
  const maintainers = pluginDetail?.maintainers ?? [];
  let installed = false;
  if (isSuccess) {
    installed = pluginDetail?.state === 'INSTALLED';
  }

  return (
    <Flex height="100%" justifyContent="space-between">
      <Box width="360px" flexShrink={0}>
        <BasicInfoCard data={pluginDetail} refetchDetails={refetch} />
        <DeveloperInfo data={maintainers} />
      </Box>
      <Tabs
        display="flex"
        flexDirection="column"
        marginLeft="20px"
        flex="1"
        boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
      >
        <CustomTabList>
          <CustomTab borderTopLeftRadius="4px">说明</CustomTab>
          <CustomTab>参数</CustomTab>
          <CustomTab>启用列表</CustomTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
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
            <AceEditor
              language="yaml"
              value={atob(pluginDetail?.metadata?.configuration ?? '')}
            />
          </TabPanel>
          <TabPanel padding="0" height="100%">
            <EnablePluginList pluginName={name || ''} installed={installed} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
