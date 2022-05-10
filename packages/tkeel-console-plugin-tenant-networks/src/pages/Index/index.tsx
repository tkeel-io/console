import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
  Loading,
  PageHeader,
  Pagination,
  // SearchInput,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  ArrowRightFilledIcon,
  EmptyFileIcon,
  NetworkIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import BaseMessage from '@/tkeel-console-plugin-tenant-networks/components/BaseMessage';

import MoreActionButton from '../../components/MoreActionButton';
import CreateNetworkButton from './components/CreateNetworkButton';
import NetWorkCard from './components/NetWorkCard';

export default function Index() {
  const navigate = useNavigate();
  const pagination = usePagination();
  // const { pageNum, pageSize } = pagination;
  // console.log(pageNum, pageSize);
  const toast = plugin.getPortalToast();

  const handleCreateNetworkSuccess = () => {
    toast('创建成功', { status: 'success' });
  };

  const isLoading = false;
  const netWorkData = [
    {
      id: '1',
      name: '格锐芬边缘计算网关',
      status: 1,
      ip: '127.0.0.1:56091',
      token: 'sd',
      time: 'sd',
    },
    {
      id: '2',
      name: '格锐芬边缘计算网关',
      status: 0,
      ip: '127.0.0.1:56095',
      token: 'sd',
      time: 'sd',
    },
    {
      id: '3',
      name: '三马边缘计算网关',
      status: 0,
      ip: '127.0.0.1:56092',
      token: 'sd',
      time: 'sd',
    },
    {
      id: '4',
      name: '格锐芬边缘计算网关',
      status: 1,
      ip: '127.0.0.1:56092',
      token: 'sd',
      time: 'sd',
    },
  ];

  return (
    <Flex flexDirection="column" h="100%" padding="8px 20px 20px">
      <PageHeader
        icon={<NetworkIcon size={40} />}
        name="网络设备管理"
        desc="为各种云到设备通信方案创建安全的双向 TCP 隧道。"
      />
      <Flex
        m="16px 0"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <SearchInput
          placeholder="支持搜索代理网关名称、客户端地址"
          onSearch={(value) => {
            // setKeywords(value);
            console.log(value);
          }}
          width="100%"
          inputStyle={{ bgColor: 'white' }}
        /> */}
        <Flex w="262px" justifyContent="space-between" alignItems="center">
          <Box m="0 12px 0 16px">操作</Box>
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
              <EmptyFileIcon size={80} />
              <Text fontSize="14px" lineHeight="24px" color="gray.700">
                请
                <CreateNetworkButton
                  key="create"
                  type="createText"
                  onSuccess={handleCreateNetworkSuccess}
                />
                代理网关
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
                  templateColumns="repeat(3, 1fr)"
                  gap="20px"
                  padding="12px 20px"
                >
                  {netWorkData.map((netWork) => {
                    const { id, name, status, ip, token, time } = netWork;
                    return (
                      <NetWorkCard
                        key={id}
                        briefInfo={{ name, status }}
                        operatorButton={
                          <MoreActionButton
                            cruxData={{
                              id,
                              name,
                              status,
                            }}
                            // refetch={() => {
                            //   refetch();
                            // }}
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
                              {status === 1 ? '添加代理服务' : '在线安装命令'}
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
