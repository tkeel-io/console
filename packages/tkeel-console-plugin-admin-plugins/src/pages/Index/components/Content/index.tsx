import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { PluginNum } from '@tkeel/console-business-components';
import { SearchInput } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import useInstalledPluginsQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useInstalledPluginsQuery';
import useRepoInstallersQuery from '@/tkeel-console-plugin-admin-plugins/hooks/queries/useRepoInstallersQuery';
import PluginList from '@/tkeel-console-plugin-admin-plugins/pages/Index/components/PluginList';

type Props = {
  isInstalledPlugins?: boolean;
  repo?: string;
};

function Content({ isInstalledPlugins = false, repo }: Props) {
  const [keyWords, setKeywords] = useState('');
  const { pageNum, pageSize, setTotalSize, ...rest } = usePagination({});

  const {
    plugins: repoPlugins,
    data: repoPluginsData,
    refetch: repoPluginsRefetch,
    isSuccess: repoPluginsIsSuccess,
    isLoading: repoPluginsLoading,
  } = useRepoInstallersQuery({
    repo: repo as string,
    keyWords,
    pageNum,
    pageSize,
    enabled: !isInstalledPlugins,
  });

  const {
    plugins: repoInstalledPlugins,
    data: repoInstalledPluginsData,
    refetch: repoInstalledPluginsRefetch,
    isSuccess: repoInstalledPluginsIsSuccess,
    isLoading: repoInstalledPluginsLoading,
  } = useInstalledPluginsQuery({
    pageNum,
    pageSize,
    keyWords,
    enabled: isInstalledPlugins,
  });

  let isLoading = false;

  if (isInstalledPlugins && repoInstalledPluginsIsSuccess) {
    isLoading = repoInstalledPluginsLoading;
    setTotalSize(repoInstalledPluginsData?.total ?? 0);
  } else if (repoPluginsIsSuccess) {
    isLoading = repoPluginsLoading;
    setTotalSize(repoPluginsData?.total ?? 0);
  }

  const plugins = isInstalledPlugins ? repoInstalledPlugins : repoPlugins;
  const pluginsData = isInstalledPlugins
    ? repoInstalledPluginsData
    : repoPluginsData;
  const totalNum = pluginsData?.total || 0;
  const installedNum = pluginsData?.installed_num || 0;

  let pluginNumData = [
    {
      name: '插件数量',
      num: totalNum,
    },
    {
      name: '已安装',
      num: installedNum,
    },
    // {
    //   name: '未安装',
    //   num: totalNum - installedNum,
    // },
  ];
  if (isInstalledPlugins) {
    pluginNumData = [pluginNumData[1]];
  }

  const refetchPlugins = () => {
    if (isInstalledPlugins) {
      repoInstalledPluginsRefetch();
    } else {
      repoPluginsRefetch();
    }
  };

  return (
    <Flex
      flexDirection="column"
      height="100%"
      paddingTop="17px"
      borderRadius="4px"
      backgroundColor="white"
    >
      <Flex margin="0 24px" alignItems="center" justifyContent="space-between">
        <PluginNum data={pluginNumData} />
        <SearchInput
          width="452px"
          placeholder="搜索插件"
          onSearch={(value) => {
            setKeywords(value);
          }}
        />
      </Flex>
      <PluginList
        refetchPlugins={refetchPlugins}
        isLoading={isLoading}
        plugins={plugins}
        pageNum={pageNum}
        pageSize={pageSize}
        setTotalSize={setTotalSize}
        {...rest}
      />
    </Flex>
  );
}

export default Content;
