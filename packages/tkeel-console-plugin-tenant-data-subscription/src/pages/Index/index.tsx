import { Box, Flex, Text } from '@chakra-ui/react';

import { TemplateCard } from '@tkeel/console-business-components';
import { Loading } from '@tkeel/console-components';
import {
  BookOpenedFilledIcon,
  MessageWarningTwoToneIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import useListSubscribeQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';

// import SubscriptionButton from './components/Button/SubscriptionButton';
import CreateSubscriptionButton from './components/CreateSubscriptionButton';

function SubscriptionCard() {
  const { isLoading, data, refetch } = useListSubscribeQuery();
  return (
    <Box
      bg="gray.50"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
      borderRadius="4px"
      mt="20px"
      paddingBottom="20px"
      overflowY="auto"
      height="80vh"
    >
      <Text
        fontWeight="600"
        fontSize="14px"
        color="gray.800"
        mt="20px"
        mb="12px"
        display="inline-block"
        padding="0 20"
      >
        更多订阅
      </Text>
      {isLoading ? (
        <Loading styles={{ wrapper: { height: '100%' } }} />
      ) : (
        <Flex flexWrap="wrap" paddingLeft="20px">
          {data.map((item) => {
            return (
              <TemplateCard
                key={item.id}
                icon={
                  <MessageWarningTwoToneIcon
                    style={{ width: '24px', height: '22px' }}
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
            );
          })}
        </Flex>
      )}
    </Box>
  );
}

function Index(): JSX.Element {
  const toast = plugin.getPortalToast();
  //  const {data} =  useSubscribeInfoQuery(id)

  const { data, refetch } = useListSubscribeQuery();
  const defaultInfo = data.find((item) => {
    return item.is_default;
  });

  return (
    <Box paddingTop="8px">
      <Flex height="30px" alignItems="center" justifyContent="space-between">
        <Flex
          fontWeight="600"
          fontSize="14px"
          color="grayAlternatives.700"
          alignItems="center"
          lineHeight="20px"
        >
          数据订阅 <BookOpenedFilledIcon style={{ marginLeft: '4px' }} />
        </Flex>
        <CreateSubscriptionButton
          key="create"
          onSuccess={() => {
            toast('创建订阅成功', { status: 'success' });
            refetch();
          }}
        />
      </Flex>
      <Box
        border="1px solid"
        borderColor="grayAlternatives.50"
        borderRadius="4px"
        background="white"
        mt="16px"
      >
        <Flex
          padding="0 20"
          lineHeight="53px"
          borderBottom="1px solid"
          borderBottomColor="grayAlternatives.50"
          fontWeight="600"
          fontSize="14px"
          color="gray.800"
        >
          我的订阅
          <Text
            display="inline"
            color="grayAlternatives.300"
            ml="12px"
            fontSize="12px"
          >
            {defaultInfo?.description}
          </Text>
        </Flex>
        <Flex
          padding="0 20"
          color="grayAlternatives.300"
          height="40px"
          alignItems="center"
          fontSize="12px"
          background="gray.50"
        >
          {/* <Box color="gray.700">
            订阅设备：
            <Text display="inline" color="primary">
              1098
            </Text>
          </Box> */}
          <Box>
            订阅ID：
            <Text display="inline">{defaultInfo?.id}</Text>
          </Box>
          <Box ml="40px">
            订阅地址：
            <Text display="inline">{defaultInfo?.endpoint}</Text>
          </Box>
        </Flex>
      </Box>
      <SubscriptionCard />
    </Box>
  );
}

export default Index;
