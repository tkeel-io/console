import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Empty,
  IconButton,
  Loading,
  MoreAction,
  PageHeader,
  Pagination,
  SearchEmpty,
  SearchInput,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  ArrowRightFilledIcon,
  LightningFilledIcon,
  NetworkIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import BaseMessage from '@/tkeel-console-plugin-tenant-networks/components/BaseMessage';
import MoreOperationButton from '@/tkeel-console-plugin-tenant-networks/components/MoreOperationButton';
import useNetworksQuery from '@/tkeel-console-plugin-tenant-networks/hooks/queries/useNetworksQuery';

import CreateNetworkButton from './components/CreateNetworkButton';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import NetWorkCard from './components/NetWorkCard';

export default function Index() {
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const toast = plugin.getPortalToast();
  const { netWorkData, data, isSuccess, isLoading, refetch } = useNetworksQuery(
    {
      pageNum,
      pageSize,
      query: keywords,
    }
  );
  const totalNum = data?.total ?? 0;
  if (isSuccess) {
    setTotalSize(totalNum);
  }

  const handleCreateNetworkSuccess = () => {
    toast('创建成功', { status: 'success' });
    refetch();
  };

  return (
    <Flex flexDirection="column" h="100%" padding="8px 20px 20px">
      <PageHeader
        icon={<NetworkIcon size={40} />}
        name="设备网络管理"
        desc="为物联网设备和物联网平台之间建立一个安全的双向TCP隧道。"
      />
      <Flex
        m="16px 0"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchInput
          placeholder="支持搜索代理网关名称"
          onSearch={(value) => {
            setKeywords(value);
          }}
          width="100%"
          inputStyle={{ bgColor: 'white' }}
        />
        <Flex w="262px" justifyContent="space-between" alignItems="center">
          <MoreAction
            styles={{
              wrapper: { m: '0 12px' },
              actionList: { width: '110px' },
            }}
            element={
              <IconButton
                style={{ padding: '0 12px' }}
                colorScheme="gray"
                icon={<LightningFilledIcon size="14px" color="white" />}
              >
                批量操作
              </IconButton>
            }
            key="more"
            buttons={[
              <ExportButton key="export" />,
              <ImportButton
                key="import"
                refetch={() => {
                  refetch();
                }}
              />,
            ]}
          />
          <CreateNetworkButton
            key="create"
            type="createButton"
            onSuccess={handleCreateNetworkSuccess}
          />
        </Flex>
      </Flex>
      {isLoading ? (
        <Loading styles={{ wrapper: { flex: 1, bgColor: 'gray.50' } }} />
      ) : (
        <Flex
          flexDirection="column"
          flex="1"
          overflow="hidden"
          paddingTop="14px"
          backgroundColor="gray.50"
          boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
          borderRadius="4px"
        >
          {netWorkData.length === 0 ? (
            <Flex
              h="100%"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {keywords ? (
                <SearchEmpty
                  title="没有符合条件的代理网关"
                  styles={{
                    wrapper: { height: '100%' },
                    image: { width: '80px' },
                    text: { color: 'gray.500', fontSize: '14px' },
                  }}
                />
              ) : (
                <Empty
                  type="component"
                  title={
                    <Text fontSize="14px" lineHeight="24px" color="gray.700">
                      请
                      <CreateNetworkButton
                        key="create"
                        type="createText"
                        onSuccess={handleCreateNetworkSuccess}
                      />
                      代理网关
                    </Text>
                  }
                  styles={{
                    wrapper: { width: '100%', height: '100%' },
                  }}
                />
              )}
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
                  templateColumns="repeat(3, 1fr)"
                  gap="20px"
                  padding="12px 20px"
                >
                  {netWorkData.map((netWork) => {
                    const {
                      id,
                      name,
                      status,
                      online,
                      client_address: ip,
                      token,
                      create_at: time,
                    } = netWork;
                    return (
                      <NetWorkCard
                        key={id}
                        briefInfo={{ name, status, online }}
                        operatorButton={
                          <MoreOperationButton
                            cruxData={{
                              id,
                              name,
                              status,
                            }}
                            refetch={() => {
                              refetch();
                            }}
                          />
                        }
                        bottomInfo={
                          <Box>
                            <BaseMessage
                              baseMsg={{ ip, token, time }}
                              styles={{
                                wrapper: { justifyContent: 'space-between' },
                              }}
                            />
                            <Flex
                              justifyContent="space-between"
                              alignItems="center"
                              padding="2px 16px"
                              bgColor="brand.50"
                              fontSize="14px"
                              color="green.300"
                              mt="12px"
                            >
                              {online === 'online'
                                ? '添加代理服务'
                                : '在线安装命令'}
                              <ArrowRightFilledIcon
                                size={13}
                                color="green.300"
                              />
                            </Flex>
                          </Box>
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
