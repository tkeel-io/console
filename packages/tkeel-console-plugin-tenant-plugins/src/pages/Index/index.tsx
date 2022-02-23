import { useState } from 'react';
import { Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
import { PluginCard, PluginNum } from '@tkeel/console-business-components';
import {
  Drawer,
  Loading,
  MoreAction,
  PageHeaderToolbar,
  Pagination,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import DisableButton from './components/DisableButton';

import EnableButton from '@/tkeel-console-plugin-tenant-plugins/components/EnableButton';
import usePluginsQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/queries/usePluginsQuery';
import Detail from '@/tkeel-console-plugin-tenant-plugins/pages/Detail';

function Index(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyWords, setKeyWords] = useState('');
  const [pluginName, setPluginName] = useState('');

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const { plugins, data, isSuccess, isLoading, refetch } = usePluginsQuery({
    pageNum,
    pageSize,
    keyWords,
  });

  const totalNum = data?.total ?? 0;
  if (isSuccess) {
    setTotalSize(totalNum);
  }

  const enableNum = data?.enable_num ?? 0;
  const notEnabledNum = totalNum >= enableNum ? totalNum - enableNum : 0;
  const pluginNumData = [
    {
      name: '插件数量',
      num: totalNum,
    },
    {
      name: '已启用',
      num: enableNum,
    },
    {
      name: '未启用',
      num: notEnabledNum,
    },
  ];

  const bottomData = [
    {
      label: '插件源',
      key: 'repo',
    },
    {
      label: '版本',
      key: 'version',
    },
  ];
  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="插件管理"
        hasSearchInput
        searchInputProps={{ onSearch: (value) => setKeyWords(value) }}
      />
      <Flex
        flexDirection="column"
        flex="1"
        overflow="hidden"
        paddingTop="14px"
        backgroundColor="gray.50"
      >
        <PluginNum data={pluginNumData} padding="0 20px" />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          flex="1"
          overflow="hidden"
        >
          {isLoading ? (
            <Loading styles={{ wrapper: { flex: 1 } }} />
          ) : (
            <Grid
              templateColumns="repeat(4, 1fr)"
              gap="8px"
              overflowY="auto"
              padding="12px 20px"
            >
              {plugins.map((plugin) => {
                const {
                  id,
                  installer_brief: installerBrief,
                  tenant_enable: tenantEnable,
                } = plugin;
                const { name } = installerBrief;
                return (
                  <PluginCard
                    key={id}
                    briefPluginInfo={installerBrief}
                    operatorButton={
                      tenantEnable ? (
                        <MoreAction
                          buttons={[
                            <DisableButton
                              key="disable"
                              pluginName={name}
                              refetchData={() => {
                                refetch();
                              }}
                            />,
                          ]}
                        />
                      ) : (
                        <EnableButton
                          pluginName={name}
                          buttonCanHover
                          refetchData={() => {
                            refetch();
                          }}
                        />
                      )
                    }
                    bottomInfo={
                      <Flex>
                        {bottomData.map((item) => (
                          <Flex
                            key={item.key}
                            marginRight="20px"
                            color="gray.600"
                            fontSize="12px"
                          >
                            <Text>{item.label}：</Text>
                            <Text>{installerBrief[item.key]}</Text>
                          </Flex>
                        ))}
                      </Flex>
                    }
                    onClick={() => {
                      setPluginName(name);
                      onOpen();
                    }}
                  />
                );
              })}
            </Grid>
          )}
          <Pagination {...pagination} />
        </Flex>
      </Flex>
      <Drawer title="插件详情" isOpen={isOpen} onClose={onClose}>
        <Detail pluginName={pluginName} />
      </Drawer>
    </Flex>
  );
}

export default Index;
