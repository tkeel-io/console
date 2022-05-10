import { Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading, PageHeader, Pagination } from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { EmptyFileIcon, MethodIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import MoreActionButton from '@/tkeel-console-plugin-tenant-routing-rules/components/MoreActionButton';
import RouteLabel, {
  RouteType,
} from '@/tkeel-console-plugin-tenant-routing-rules/components/RouteLabel';
import useRouteRulesQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRouteRulesQuery';
import CreateRulesButton from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/CreateRulesButton';
import RouteRulesCard from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/RouteRulesCard';
import Step from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/Step';
import Tabs from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/Tabs';

export default function Index(): JSX.Element {
  const navigate = useNavigate();
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const [keyWords, setKeyWords] = useState(0);
  const toast = plugin.getPortalToast();
  const routeTypeArr: RouteType[] = ['msg', 'time'];
  const { routeRulesData, data, isSuccess, isLoading, refetch } =
    useRouteRulesQuery({
      pageNum,
      pageSize,
      type: keyWords,
    });
  const totalNum = data?.total ?? 0;
  if (isSuccess) {
    setTotalSize(totalNum);
  }

  const handleCreateRuleSuccess = () => {
    toast('创建成功', { status: 'success' });
    refetch();
  };

  return (
    <Flex flexDirection="column" h="100%" padding="8px 20px 20px">
      <PageHeader
        icon={<MethodIcon size={40} />}
        name="数据路由规则"
        // documentsPath={documents.config.paths.adminGuide.plugins}
        desc="平台接入的设备数据可以通过自定义的路由规则进行数据的简单处理并流转向其它服务。"
      />
      <Flex justifyContent="space-between" m="14px 0 22px">
        <Tabs
          onClick={(e: number) => {
            setKeyWords(e);
          }}
        />
        <CreateRulesButton
          key="create"
          type="createButton"
          onSuccess={handleCreateRuleSuccess}
        />
      </Flex>
      {isLoading ? (
        <Loading
          styles={{ wrapper: { flex: 1, backgroundColor: 'gray.50' } }}
        />
      ) : (
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
                  onSuccess={handleCreateRuleSuccess}
                />
                数据路由规则
              </Text>
            </Flex>
          ) : (
            <Flex flexDirection="column" flex="1" overflow="hidden">
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                flex="1"
                overflow="auto"
              >
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  gap="20px"
                  padding="12px 20px"
                >
                  {routeRulesData.map((rule) => {
                    const {
                      id,
                      name,
                      desc,
                      status,
                      type,
                      devices_status: deviceStatus,
                      targets_status: targetStatus,
                      sub_id: errorOperation,
                      model_id: deviceTemplateId,
                      model_name: deviceTemplateName,
                    } = rule;
                    const currentStep = [
                      deviceStatus,
                      targetStatus,
                      errorOperation,
                    ];
                    return (
                      <RouteRulesCard
                        key={id}
                        briefInfo={{ name, desc, status }}
                        operatorButton={
                          <MoreActionButton
                            cruxData={{
                              id,
                              name,
                              status,
                              desc,
                              type,
                              deviceTemplateId,
                              deviceTemplateName,
                            }}
                            refetch={() => {
                              refetch();
                            }}
                          />
                        }
                        bottomInfo={
                          <Flex alignItems="center">
                            <RouteLabel routeType={routeTypeArr[type - 1]} />
                            <Step currentStep={currentStep} />
                          </Flex>
                        }
                        onClick={() =>
                          navigate(`/detail/${id}?menu-collapsed=true`)
                        }
                      />
                    );
                  })}
                </Grid>
              </Flex>
              <Pagination
                {...pagination}
                styles={{ wrapper: { padding: '0 20px' } }}
              />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
}
