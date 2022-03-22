import { Flex, Grid, Text } from '@chakra-ui/react';

import { PageHeaderToolbar, Pagination } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { EmptyFileIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import MoreActionButton from '@/tkeel-console-plugin-tenant-routing-rules/components/MoreActionButton';
import RouteLabel from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';
import CreateRulesButton from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/CreateRulesButton';
import RouteRulesCard from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/RouteRulesCard';

export default function Index(): JSX.Element {
  const pagination = usePagination();
  const toast = plugin.getPortalToast();
  const handleCreateUserSuccess = () => {
    toast('创建成功', { status: 'success' });
    // refetch();
  };
  const routeRulesData = [
    {
      id: '1',
      name: '数据方案A',
      status: 1,
      desc: '将设备数据中的无用数据过滤掉1',
      routeType: 'msg',
      process: 1,
    },
    {
      id: '2',
      name: '数据方案B',
      status: 0,
      desc: '将设备数据中的无用数据过滤掉2',
      routeType: 'time',
      process: 2,
    },
    {
      id: '3',
      name: '数据方案C',
      status: 1,
      desc: '将设备数据中的无用数据过滤掉3',
      routeType: 'msg',
      process: 3,
    },
  ];
  return (
    <Flex flexDirection="column" h="100%">
      <PageHeaderToolbar
        name="数据路由规则"
        hasIcon
        buttons={[
          <CreateRulesButton
            key="create"
            type="createButton"
            onSuccess={handleCreateUserSuccess}
          />,
        ]}
      />
      <Flex
        flexDirection="column"
        flex="1"
        overflow="hidden"
        paddingTop="14px"
        backgroundColor="gray.50"
      >
        {routeRulesData.length === 0 ? (
          <Flex
            h="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <EmptyFileIcon size={80} />
            <Text fontSize="14px" lineHeight="24px" color="gray.700">
              请
              <CreateRulesButton
                key="create"
                type="createText"
                onSuccess={handleCreateUserSuccess}
              />
              数据路由规则
            </Text>
          </Flex>
        ) : (
          <>
            <Flex flexDirection="column" flex="1">
              <Grid
                templateColumns="repeat(2, 1fr)"
                gap="20px"
                overflowY="auto"
                padding="12px 20px"
              >
                {routeRulesData.map((rule) => {
                  const { id, name, desc, status, routeType } = rule;
                  return (
                    <RouteRulesCard
                      key={id}
                      briefInfo={{ name, desc, status }}
                      operatorButton={
                        <MoreActionButton cruxData={{ id, status }} />
                      }
                      bottomInfo={
                        <Flex>
                          <RouteLabel routeType={routeType} />
                        </Flex>
                      }
                      onClick={() => {}}
                    />
                  );
                })}
              </Grid>
            </Flex>
            <Pagination
              {...pagination}
              styles={{ wrapper: { padding: '0 20px' } }}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
}
