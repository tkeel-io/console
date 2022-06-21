import { Accordion, Center, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  Empty,
  Loading,
  PageHeader,
  Pagination,
  SearchEmpty,
  SearchInput,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { HornTwoToneIcon, RefreshCircleFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useNotificationQuery from '@/tkeel-console-plugin-tenant-notification-objects/hooks/queries/useNotificationQuery';
import CreateNotificationButton from '@/tkeel-console-plugin-tenant-notification-objects/pages/components/CreateNotificationButton';
import MoreOperationButton from '@/tkeel-console-plugin-tenant-notification-objects/pages/components/MoreOperationButton';
import NotificationSelectCard from '@/tkeel-console-plugin-tenant-notification-objects/pages/components/NotificationSelectCard';

export default function Index() {
  const [keyWords, setKeywords] = useState('');
  const toast = plugin.getPortalToast();
  const { tenantInfo } = plugin.getPortalProps().client;
  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;
  const [refreshLoading, setRefreshLoading] = useState(false);
  const { notificationData, data, isSuccess, isLoading, refetch } =
    useNotificationQuery({
      pageNum,
      pageSize,
      groupName: keyWords,
      tenantId: tenantInfo.tenant_id,
    });
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
        icon={<HornTwoToneIcon size={40} />}
        name="通知对象"
        desc="通知对象"
      />
      <Flex
        m="16px 0 0"
        p="12px 20px"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bgColor="gray.50"
        borderRadius="4px 0"
      >
        <SearchInput
          placeholder="支持搜索对象组名"
          onSearch={(value) => {
            setKeywords(value);
          }}
          width="100%"
          inputStyle={{ bgColor: 'gray.50' }}
        />
        <Flex justifyContent="space-between" alignItems="center">
          <Center
            h="32px"
            w="32px"
            bgColor="gray.100"
            borderRadius="50%"
            cursor="pointer"
            m="0 12px"
          >
            <RefreshCircleFilledIcon
              size={17}
              onClick={() => {
                refetch();
                setRefreshLoading(true);
                setTimeout(() => {
                  setRefreshLoading(false);
                }, 300);
              }}
            />
          </Center>
          <CreateNotificationButton
            key="create"
            type="createButton"
            onSuccess={handleCreateNetworkSuccess}
          />
        </Flex>
      </Flex>
      {isLoading || refreshLoading ? (
        <Loading styles={{ wrapper: { flex: 1, bgColor: 'gray.50' } }} />
      ) : (
        <Flex
          flexDirection="column"
          flex="1"
          overflow="hidden"
          bgColor="gray.100"
        >
          {notificationData.length === 0 ? (
            <Flex
              h="100%"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {keyWords ? (
                <SearchEmpty
                  title="没有符合条件的通知对象"
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
                      <CreateNotificationButton
                        key="create"
                        type="createText"
                        onSuccess={handleCreateNetworkSuccess}
                      />
                      通知对象
                    </Text>
                  }
                  styles={{
                    wrapper: { width: '100%', height: '100%' },
                  }}
                />
              )}
            </Flex>
          ) : (
            <Flex flexDirection="column" flex="1" overflow="auto">
              <Accordion allowMultiple flex="1" overflow="auto" p="16px 20px 0">
                {notificationData.map((item) => {
                  const { noticeId, groupName, noticeDesc, emailAddress } =
                    item;
                  return (
                    <NotificationSelectCard
                      key={noticeId}
                      briefInfo={{
                        name: groupName,
                        desc: noticeDesc,
                        emailAddress: emailAddress || '',
                        noticeId,
                      }}
                      refetch={() => {
                        refetch();
                      }}
                      operatorButton={
                        <MoreOperationButton
                          cruxData={{
                            id: noticeId,
                            name: groupName,
                            desc: noticeDesc,
                          }}
                          refetch={() => {
                            refetch();
                          }}
                        />
                      }
                    />
                  );
                })}
              </Accordion>
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
