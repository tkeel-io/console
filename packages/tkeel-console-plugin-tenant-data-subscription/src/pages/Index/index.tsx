import { useNavigate } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Loading, MoreAction, toast } from '@tkeel/console-components';
import {
  BookOpenedFilledIcon,
  MessageWarningTwoToneIcon,
} from '@tkeel/console-icons';

// import SubscriptionButton from './components/Button/SubscriptionButton';
import CreateSubscriptionButton from './components/CreateSubscriptionButton';

import useListSubscribeQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeQuery';
// import useSubscribeInfoQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useSubscribeInfoQuery';
import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/DeleteSubscriptionButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';

function SubscriptionCard() {
  const navigate = useNavigate();

  const { isLoading, data, refetch } = useListSubscribeQuery();
  return (
    <Box
      bg="gray.50"
      boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
      borderRadius="4px"
      mt="20px"
      paddingBottom="20px"
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
              <Box
                borderRadius="4px"
                background="gray.50"
                border="1px"
                borderStyle="solid"
                borderColor="blue.50"
                // flex="1"
                width="48%"
                key={item.title}
                margin="0 20px 12px 0"
              >
                <Flex height="76px" flexDir="column" padding="0 20">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Flex
                      alignItems="center"
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <MessageWarningTwoToneIcon
                        style={{ width: '24px', height: '22px' }}
                      />
                      <Box lineHeight="50px" ml="12px">
                        {item.title}
                      </Box>
                      {/* <Text
                        display="inline"
                        ml="12px"
                        color="orange.300"
                        background="orange.50"
                        width="44px"
                        fontSize="12px"
                        textAlign="center"
                      >
                        已订阅
                      </Text> */}
                    </Flex>

                    <Flex>
                      {/* <SubscriptionButton
                        style={{
                          width: '60px',
                          height: '28px',
                          borderRadius: '4px',
                          marginLeft: '12px',
                        }}
                      >
                        订阅
                      </SubscriptionButton> */}
                      <Box ml="6px">
                        <MoreAction
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
                        />
                      </Box>
                    </Flex>
                  </Flex>

                  <Text color="grayAlternatives.300" fontSize="12px">
                    {item.description}
                  </Text>
                </Flex>
                <Flex
                  background="white"
                  height="40px"
                  alignItems="center"
                  fontSize="12px"
                  borderRadius="0 0 4px 4px"
                  padding="0 20"
                >
                  {/* <Box color="gray.700">
                    订阅设备：
                    <Text display="inline" color="primary">
                      1098
                    </Text>
                  </Box> */}
                  <Box>
                    订阅ID：
                    <Text display="inline">{item.id}</Text>
                  </Box>
                  <Box ml="40px">
                    订阅地址：
                    <Text display="inline">{item.endpoint}</Text>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      )}
    </Box>
  );
}

function Index(): JSX.Element {
  //  const {data} =  useSubscribeInfoQuery(id)

  const { data, refetch } = useListSubscribeQuery();
  const defaultInfo = data.find((item) => {
    return item.is_default;
  });

  return (
    <Box>
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
            toast({ status: 'success', title: '创建订阅成功' });

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
