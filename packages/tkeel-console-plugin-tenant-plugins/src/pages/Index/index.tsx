import { useState } from 'react';
import { Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
import { PluginCard } from '@tkeel/console-business-components';
import {
  Drawer,
  MoreAction,
  PageHeaderToolbar,
  Pagination,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import {
  DisableButton,
  EnableButton,
} from '@/tkeel-console-plugin-tenant-plugins/components';
import usePluginsQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/queries/usePluginsQuery';
import Detail from '@/tkeel-console-plugin-tenant-plugins/pages/Detail';

function Index(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyWords, setKeyWords] = useState('');
  const [pluginName, setPluginName] = useState('');

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const { plugins, data, isSuccess, refetch } = usePluginsQuery({
    pageNum,
    pageSize,
    keyWords,
  });
  if (isSuccess) {
    setTotalSize(data?.total ?? 0);
  }

  const pluginNum = [
    {
      name: '插件数量',
      num: 1,
    },
    {
      name: '已启用',
      num: 1,
    },
    {
      name: '未启用',
      num: 0,
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
        backgroundColor="gray.50"
      >
        <Flex alignItems="center">
          {pluginNum.map((item) => (
            <Flex key={item.name} alignItems="center" marginRight="5px">
              <Text color="gray.700" fontSize="12px" fontWeight="500">
                {item.name}
              </Text>
              <Text
                marginLeft="2px"
                color="gray.500"
                fontSize="12px"
                fontWeight="500"
              >
                {item.num}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap="8px"
          overflowY="auto"
          padding="12px 20px"
          flex="1"
        >
          {[...plugins, ...plugins, ...plugins].map((plugin) => {
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
                          refetchList={() => {
                            refetch();
                          }}
                        />,
                      ]}
                    />
                  ) : (
                    <EnableButton
                      pluginName={name}
                      refetchList={() => {
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
        <Pagination {...pagination} />
      </Flex>
      <Drawer title="插件详情" isOpen={isOpen} onClose={onClose}>
        <Detail pluginName={pluginName} />
      </Drawer>
    </Flex>
  );
}

export default Index;
