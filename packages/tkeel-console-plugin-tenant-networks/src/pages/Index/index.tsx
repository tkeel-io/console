import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
  Loading,
  PageHeaderToolbar,
  Pagination,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { ArrowRightFilledIcon, EmptyFileIcon } from '@tkeel/console-icons';
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
      <PageHeaderToolbar
        name="网络服务"
        buttons={[
          <CreateNetworkButton
            key="create"
            type="createButton"
            onSuccess={handleCreateNetworkSuccess}
          />,
        ]}
      />
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
