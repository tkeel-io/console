import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BackButton, Clipboard, MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  MessageWarningTwoToneIcon,
  OfficialFilledIcon,
} from '@tkeel/console-icons';

import DeleteSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/components/DeleteSubscriptionButton';
import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/components/ModifySubscriptionButton';
import { ApiData as SubscribeInfo } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useSubscribeInfoQuery';

type Props = {
  data: SubscribeInfo;
  refetchData: () => unknown;
};

export default function BasicInfoCard({ data, refetchData }: Props) {
  const navigate = useNavigate();
  const endpoint = data?.endpoint ?? '';
  const defaultValues = {
    description: data?.description ?? '',
    endpoint,
    id: data?.id ?? '',
    title: data?.title ?? '',
    is_default: data?.is_default,
  };

  const whiteColor = useColor('white');
  const grayColor = useColor('gray.50');

  return (
    <Box
      borderTopLeftRadius="4px"
      borderTopRadius="4px"
      backgroundColor="white"
    >
      <Box
        position="relative"
        height="108px"
        background={`linear-gradient(180deg, ${whiteColor} 0%, ${grayColor} 100%)`}
      >
        <OfficialFilledIcon
          style={{
            width: '197px',
            height: '108px',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          padding="0 10px"
          paddingTop="10px"
        >
          <BackButton
            onClick={() => {
              navigate('/');
            }}
          />
          {!!data && (
            <MoreAction
              buttons={[
                <ModifySubscriptionButton
                  key="modify"
                  data={defaultValues}
                  onSuccess={refetchData}
                />,
                <DeleteSubscriptionButton
                  key="delete"
                  id={data?.id}
                  name={data?.title}
                  refetchData={() => {
                    navigate('/');
                  }}
                />,
              ]}
            />
          )}
        </Flex>
        <Flex
          height="70px"
          align="center"
          padding="0 20px"
          position="relative"
          zIndex="2"
        >
          <MessageWarningTwoToneIcon size="22px" />
          <Text
            lineHeight="50px"
            ml="12px"
            color="gray.700"
            fontWeight="600"
            fontSize="14px"
            noOfLines={1}
          >
            {data?.title}
          </Text>
        </Flex>
      </Box>
      <Flex
        alignItems="center"
        height="40px"
        fontSize="12px"
        color="grayAlternatives.300"
        paddingLeft="20px"
      >
        <Text color="grayAlternatives.300" fontSize="12px">
          订阅地址
        </Text>
        {endpoint && (
          <>
            <Text
              color="gray.800"
              ml="26px"
              maxWidth="200px"
              noOfLines={1}
              title={endpoint}
            >
              {endpoint}
            </Text>
            <Clipboard
              text={endpoint}
              styles={{ wrapper: { marginLeft: '3px' } }}
            />
          </>
        )}
      </Flex>
    </Box>
  );
}
