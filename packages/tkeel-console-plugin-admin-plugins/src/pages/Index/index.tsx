import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '@tkeel/console-components';
import { AppsAddFilledIcon } from '@tkeel/console-icons';

import Content from './Content';
import CreatePluginButton from './CreatePluginButton';
import CustomTab from './CustomTab';

import useInstalledPluginsQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useInstalledPluginsQuery';
import useReposQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useReposQuery';
import useRepoInstallersQueries from '@/tkeel-console-plugin-admin-plugins/hooks/useRepoInstallersQueries';

function Index(): JSX.Element {
  const { repos } = useReposQuery();
  const { pluginsList: repoPluginsList } = useRepoInstallersQueries({
    repos: repos.map((repo) => repo.name),
    enabled: repos.length > 0,
  });
  const { plugins: installedPlugins } = useInstalledPluginsQuery();

  const repoPluginInfosList = repoPluginsList.map((repoPlugin) => {
    return repoPlugin.map((plugin) => ({
      ...plugin,
      installed: !!plugin.installed,
    }));
  });

  const installedPluginInfos = installedPlugins.map((plugin) => ({
    ...plugin.brief_installer_info,
    installed: true,
  }));

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
        // onChange={handleTabChange}
      >
        <CreatePluginButton />
        <TabList
          padding="2px"
          width="max-content"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          backgroundColor="gray.50"
          borderRadius="22px"
        >
          {repos.map((item, i) => (
            <CustomTab key={item.name} num={repoPluginsList[i]?.length}>
              {item.name}
            </CustomTab>
          ))}
          <CustomTab num={installedPluginInfos.length}>已安装</CustomTab>
        </TabList>
        <TabPanels flex="1" overflow="hidden" marginTop="16px">
          {repos.map((item, i) => (
            <TabPanel key={item.name} height="100%" padding="0">
              <Content pluginInfos={repoPluginInfosList[i]} />
            </TabPanel>
          ))}
          <TabPanel height="100%" padding="0">
            <Content pluginInfos={installedPluginInfos} isInstalledPlugins />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Index;
