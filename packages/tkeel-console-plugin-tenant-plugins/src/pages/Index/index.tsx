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

import { DisableButton } from '@/tkeel-console-plugin-tenant-plugins/components';
// import { CaretRightFilledIcon } from '@tkeel/console-icons';
import usePluginsQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/queries/usePluginsQuery';
import Detail from '@/tkeel-console-plugin-tenant-plugins/pages/Detail';

function Index(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pluginName, setPluginName] = useState('');

  const pagination = usePagination();
  const { setTotalSize } = pagination;
  const { plugins, data, isSuccess } = usePluginsQuery();
  if (isSuccess) {
    setTotalSize(data?.total ?? 0);
  }

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
      <PageHeaderToolbar name="插件管理" hasSearchInput />
      <Flex
        flexDirection="column"
        flex="1"
        overflow="hidden"
        backgroundColor="gray.50"
      >
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap="8px"
          overflowY="auto"
          padding="12px 20px"
          flex="1"
        >
          {plugins.map((plugin) => {
            const { id, brief_installer_info: briefInstallerInfo } = plugin;
            return (
              <PluginCard
                key={id}
                briefPluginInfo={briefInstallerInfo}
                operatorButton={
                  // <RectangleButton
                  //   leftIcon={<CaretRightFilledIcon color="primary" />}
                  // >
                  //   启用
                  // </RectangleButton>
                  <MoreAction buttons={[<DisableButton key="disable" />]} />
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
                        <Text>{briefInstallerInfo[item.key]}</Text>
                      </Flex>
                    ))}
                  </Flex>
                }
                onClick={() => {
                  setPluginName(briefInstallerInfo.name);
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
