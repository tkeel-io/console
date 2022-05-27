import { Box, Center, Flex } from '@chakra-ui/react';

import { TemplateCard } from '@tkeel/console-business-components';
import {
  Loading,
  PageHeader,
  PageHeaderToolbar,
} from '@tkeel/console-components';
import {
  // BookOpenedFilledIcon,
  MessageWarningTwoToneIcon,
} from '@tkeel/console-icons';
import { useSubscribeListQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/components/DeleteSubscriptionButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/components/ModifySubscriptionButton';

import CreateSubscriptionButton from './components/CreateSubscriptionButton';

function SubscriptionCard() {
  const { isLoading, subscribeList, refetch } = useSubscribeListQuery();
  return (
    <Box
      flex="1"
      padding="20px"
      overflowY="auto"
      borderBottomLeftRadius="4px"
      borderBottomRightRadius="4px"
      bg="gray.100"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
    >
      {isLoading ? (
        <Loading styles={{ wrapper: { height: '100%' } }} />
      ) : (
        <Flex justifyContent="space-between" flexWrap="wrap">
          {subscribeList.map((item) => {
            return (
              <Box key={item.id} position="relative" width="49.7%">
                <TemplateCard
                  icon={
                    <MessageWarningTwoToneIcon
                      size={26}
                      style={{ marginLeft: '4px' }}
                    />
                  }
                  title={item.title}
                  description={item.description}
                  navigateUrl={`/detail/${item.id}`}
                  buttons={[
                    <ModifySubscriptionButton
                      data={item}
                      key="modify"
                      onSuccess={() => {
                        refetch();
                      }}
                    />,
                    <DeleteSubscriptionButton
                      key="delete"
                      id={item.id}
                      name={item.title}
                      refetchData={() => {
                        refetch();
                      }}
                    />,
                  ]}
                  footer={[
                    { name: '订阅ID', value: item.id },
                    { name: '订阅地址', value: item.endpoint },
                  ]}
                />
                {item.is_default && (
                  <Center
                    position="absolute"
                    left="1px"
                    top="1px"
                    width="40px"
                    height="24px"
                    color="orange.300"
                    fontSize="12px"
                    borderTopLeftRadius="4px"
                    borderBottomRightRadius="50%"
                    backgroundColor="orange.50"
                  >
                    默认
                  </Center>
                )}
              </Box>
            );
          })}
        </Flex>
      )}
    </Box>
  );
}

function Index(): JSX.Element {
  const toast = plugin.getPortalToast();

  const { refetch } = useSubscribeListQuery();

  const documents = plugin.getPortalDocuments();

  return (
    <Flex paddingTop="12px" flexDirection="column" height="100%">
      <PageHeader
        icon={<MessageWarningTwoToneIcon />}
        name="数据订阅"
        desc="数据订阅可以订阅设备的多种消息，包括状态变更，上报的消息等。"
        documentsPath={documents.config.paths.tenantGuide.dataSubscribe}
      />
      <PageHeaderToolbar
        buttons={[
          <CreateSubscriptionButton
            key="create"
            onSuccess={() => {
              toast('创建订阅成功', { status: 'success' });
              refetch();
            }}
          />,
        ]}
        styles={{
          wrapper: {
            marginTop: '16px',
            height: '64px',
            padding: '0 20px',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            backgroundColor: 'gray.50',
          },
        }}
      />
      <SubscriptionCard />
    </Flex>
  );
}

export default Index;
