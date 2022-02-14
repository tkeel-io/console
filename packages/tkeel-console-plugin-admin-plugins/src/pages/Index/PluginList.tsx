import { useNavigate } from 'react-router-dom';
import { Flex, Grid, Tag, Text } from '@chakra-ui/react';
import { PluginCard } from '@tkeel/console-business-components';
import { Loading, MoreAction, Pagination } from '@tkeel/console-components';
import { UsePaginationReturnType } from '@tkeel/console-types';

import InstallButton from '@/tkeel-console-plugin-admin-plugins/components/InstallButton';
import UnInstallButton from '@/tkeel-console-plugin-admin-plugins/components/UnInstallButton';
import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

interface Props extends UsePaginationReturnType {
  refetchPlugins: () => unknown;
  isLoading: boolean;
  plugins: PluginInfo[];
}

function PluginList({
  refetchPlugins,
  isLoading,
  plugins,
  pageNum,
  pageSize,
  totalSize,
  canPreviousPage,
  canNextPage,
  setPageNum,
  setPageSize,
}: Props) {
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      flex="1"
      overflow="hidden"
    >
      {isLoading ? (
        <Loading styles={{ wrapper: { height: '100%' } }} />
      ) : (
        <>
          <Grid
            padding="20px 24px"
            templateColumns="repeat(4, 1fr)"
            gap="8px"
            overflowY="auto"
          >
            {plugins.map((pluginInfo) => {
              const { name, version, icon, desc, repo, installed } = pluginInfo;
              const installPluginInfo = {
                name,
                version,
                repo,
                installed,
              };

              const briefPluginInfo = {
                ...installPluginInfo,
                icon,
                desc,
              };

              return (
                <PluginCard
                  key={`${name}${version}`}
                  briefPluginInfo={briefPluginInfo}
                  onClick={() => {
                    navigate(`/detail/${repo}/${name}/${version}`);
                  }}
                  operatorButton={
                    installed ? (
                      <MoreAction
                        buttons={[
                          <UnInstallButton
                            key="delete"
                            pluginName={installPluginInfo.name}
                            onSuccess={refetchPlugins}
                          />,
                        ]}
                      />
                    ) : (
                      <InstallButton
                        installPluginInfo={installPluginInfo}
                        onSuccess={refetchPlugins}
                      />
                    )
                  }
                  bottomInfo={
                    <Flex justifyContent="space-between">
                      <Tag colorScheme="orange" size="sm">
                        用户
                      </Tag>
                      <Flex
                        alignItems="center"
                        color="gray.500"
                        fontSize="12px"
                      >
                        <Text>Ver：{version}</Text>
                        <Text marginLeft="20px">Repo：{repo}</Text>
                      </Flex>
                    </Flex>
                  }
                />
              );
            })}
          </Grid>
          <Pagination
            pageNum={pageNum}
            pageSize={pageSize}
            totalSize={totalSize}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            setPageNum={setPageNum}
            setPageSize={setPageSize}
          />
        </>
      )}
    </Flex>
  );
}

export default PluginList;
