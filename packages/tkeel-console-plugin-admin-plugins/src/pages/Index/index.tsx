/* eslint-disable react/no-array-index-key */
import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { PageHeader } from '@tkeel/console-components';
import { PuzzleTwoToneIcon } from '@tkeel/console-icons';

import useInstalledPluginsQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useInstalledPluginsQuery';
import useReposQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useReposQuery';

import AddRepoButton from './components/AddRepoButton';
import Content from './components/Content';
import CustomTab from './components/CustomTab';

function Index(): JSX.Element {
  const { repos, refetch, isLoading } = useReposQuery();
  const { plugins: installedPlugins } = useInstalledPluginsQuery();

  return (
    <Flex paddingTop="16px" flexDirection="column" height="100%">
      <PageHeader
        icon={<PuzzleTwoToneIcon size={26} />}
        name="插件管理"
        desc="展示平台安装完成后静默注册的核心插件。"
      />
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
            <CustomTab key={repo.name} num={repo.installer_num}>
              {repo.name}
            </CustomTab>
          ))}
          {!isLoading && (
            <CustomTab num={installedPlugins.length}>已安装</CustomTab>
          )}
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
    </Flex>
  );
}

export default Index;
