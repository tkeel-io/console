import { Box, Flex, Grid, Tag, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { PluginCard } from '@tkeel/console-business-components';
import { Loading, MoreAction, Pagination } from '@tkeel/console-components';
import { UsePaginationReturnType } from '@tkeel/console-types';

import {
  InstallButton,
  UninstallButton,
} from '@/tkeel-console-plugin-admin-plugins/components';
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
            templateColumns="repeat(4, minmax(0, 1fr))"
            gap="8px"
            overflowY="auto"
          >
            {plugins.map((pluginInfo) => {
              const { name, version, icon, desc, repo, state, annotations } =
                pluginInfo;
              const installPluginInfo = {
                name,
                version,
                repo,
                state,
              };

              const briefPluginInfo = {
                ...installPluginInfo,
                icon,
                desc,
              };
              const tagMap = {
                User: '用户',
                manager: '系统',
              };
              const tag = annotations['tkeel.io/tag'];

              return (
                <PluginCard
                  key={`${repo}${name}${version}`}
                  briefPluginInfo={briefPluginInfo}
                  onClick={() => {
                    navigate(
                      `/detail?repo=${repo}&name=${name}&version=${version}&menu-collapsed=true`
                    );
                  }}
                  operatorButton={
                    state === 'INSTALLED' ? (
                      <Box position="relative" width="28px" height="100%">
                        <MoreAction
                          buttons={[
                            <UninstallButton
                              key="delete"
                              pluginName={installPluginInfo.name}
                              onSuccess={refetchPlugins}
                            />,
                          ]}
                          styles={{
                            wrapper: {
                              position: 'absolute',
                              top: '0',
                              right: '0',
                              marginRight: '-4px',
                            },
                          }}
                        />
                      </Box>
                    ) : (
                      <InstallButton
                        installPluginInfo={installPluginInfo}
                        onSuccess={refetchPlugins}
                      />
                    )
                  }
                  bottomInfo={
                    <Flex justifyContent="space-between">
                      {tagMap[tag] && (
                        <Tag
                          flexShrink={0}
                          colorScheme={tag === 'User' ? 'orange' : 'green'}
                          size="sm"
                          padding="0 4px"
                          borderRadius="2px"
                        >
                          {tagMap[tag]}
                        </Tag>
                      )}
                      <Flex
                        alignItems="center"
                        maxWidth="80%"
                        color="gray.500"
                        fontSize="12px"
                      >
                        <Text maxWidth="50%" noOfLines={1} title={version}>
                          版本：{version}
                        </Text>
                        <Text
                          maxWidth="50%"
                          marginLeft="20px"
                          noOfLines={1}
                          title={repo}
                        >
                          插件源：{repo}
                        </Text>
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
            styles={{ wrapper: { padding: '0 20px' } }}
          />
        </>
      )}
    </Flex>
  );
}

export default PluginList;
