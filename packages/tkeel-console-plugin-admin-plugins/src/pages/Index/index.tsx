import { Flex, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { PageHeader } from '@tkeel/console-components';
import { AppsAddFilledIcon } from '@tkeel/console-icons';

import Content from './Content';
import CreatePluginButton from './CreatePluginButton';
import CustomTab from './CustomTab';

import useInstalledPluginsQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useInstalledPluginsQuery';
import useRepoInstallersQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useRepoInstallersQuery';

function Index(): JSX.Element {
  const { plugins: repoPlugins } = useRepoInstallersQuery('tkeel-default');
  const { plugins: installedPlugins } = useInstalledPluginsQuery();

  const repoPluginInfos = repoPlugins.map((plugin) => ({
    ...plugin,
    installed: !!plugin.installed,
  }));

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
      >
        <CreatePluginButton />
        <TabList
          padding="2px"
          width="254px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          backgroundColor="gray.50"
          borderRadius="22px"
        >
          <CustomTab num={repoPlugins.length}>tKeel</CustomTab>
          <CustomTab num={installedPluginInfos.length}>已安装</CustomTab>
        </TabList>
        <TabPanels flex="1" overflow="hidden" marginTop="16px">
          <TabPanel height="100%" padding="0">
            <Content pluginInfos={repoPluginInfos} />
          </TabPanel>
          <TabPanel height="100%" padding="0">
            <Content pluginInfos={installedPluginInfos} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Index;
