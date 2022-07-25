import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { Loading, PageHeader } from '@tkeel/console-components';
import { PuzzleTwoToneIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useInstalledPluginsQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useInstalledPluginsQuery';
import useReposQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useReposQuery';

import AddRepoButton from './components/AddRepoButton';
import Content from './components/Content';
import CustomRepoTab from './components/CustomRepoTab';

function Index(): JSX.Element {
  const { repos, refetch, isLoading } = useReposQuery();
  const { total } = useInstalledPluginsQuery();
  const documents = plugin.getPortalDocuments();

  return (
    <Flex paddingTop="16px" flexDirection="column" height="100%">
      <PageHeader
        icon={<PuzzleTwoToneIcon />}
        name="插件管理"
        documentsPath={documents.config.paths.adminGuide.plugins}
        desc="展示平台安装完成后静默注册的核心插件。"
      />
      {isLoading ? (
        <Loading sx={{ flex: 1 }} />
      ) : (
        <Tabs
          position="relative"
          display="flex"
          flexDirection="column"
          flex="1"
          overflow="hidden"
          marginTop="16px"
          borderTopLeftRadius="4px"
          isLazy
        >
          <AddRepoButton
            refetchRepos={() => {
              refetch();
            }}
          />
          <TabList
            padding="2px"
            width="max-content"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.200"
            backgroundColor="gray.50"
            borderRadius="22px"
          >
            {repos.map((repo) => (
              <CustomRepoTab key={repo.name} num={repo.installer_num}>
                {repo.name}
              </CustomRepoTab>
            ))}
            {!isLoading && <CustomRepoTab num={total}>已安装</CustomRepoTab>}
          </TabList>
          <TabPanels flex="1" overflow="hidden" marginTop="16px">
            {repos.map((repo) => (
              <TabPanel key={repo.name} height="100%" padding="0">
                <Content repo={repo.name} />
              </TabPanel>
            ))}
            {!isLoading && (
              <TabPanel height="100%" padding="0">
                <Content isInstalledPlugins />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      )}
    </Flex>
  );
}

export default Index;
