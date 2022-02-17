import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Colors,
  Flex,
  HStack,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { MoreAction } from '@tkeel/console-components';
import {
  ChevronLeftFilledIcon,
  MessageWarningTwoToneIcon,
  VpcTwoToneIcon,
  WebcamTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

import {
  statusInfo,
  subscribe,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';
import {
  CardContentFlex,
  IconWrapper,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/index.style';
import CreateDeviceButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateDeviceButton';
import CreateDeviceGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateDeviceGroupButton';

interface CustomColor extends Colors {
  primary: string;
}

type Props = {
  selfLearn: {
    color: string;
    twoToneColor: string;
  };
  isSelfLearn: boolean | undefined;
  status: string;
};

const connectionIcon = {
  offline: <WifiOffFilledIcon key="wifi-off" />,
  online: <WifiFilledIcon key="wifi" />,
};

function DeviceInfoCard({
  selfLearn,
  isSelfLearn,
  status,
}: Props): JSX.Element {
  const { colors }: { colors: CustomColor } = useTheme();
  const navigate = useNavigate();

  return (
    <VStack
      w="100%"
      bg="white"
      p="12px 12px 12px 20px"
      borderRadius="4px"
      spacing="20px"
      align="left"
    >
      <CardContentFlex bg="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)">
        <Flex
          w="64px"
          h="32px"
          alignItems="center"
          _hover={{
            bg: 'primarySub',
            border: '1px',
            borderColor: 'primarySub',
            borderRadius: '70px',
            color: 'primary',
            '& > svg': {
              fill: `${colors.primary} !important`,
            },
          }}
        >
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ChevronLeftFilledIcon />}
            onClick={() => {
              navigate('/');
            }}
          >
            返回
          </Button>
        </Flex>
        <MoreAction
          buttons={[
            <CreateDeviceButton key="device" />,
            <CreateDeviceGroupButton key="device-group" />,
          ]}
        />
      </CardContentFlex>
      <CardContentFlex>
        <Box display="flex">
          <WebcamTwoToneIcon size="24px" />
          <Box as="span" fontSize="14px" fontWeight={600} ml="8px">
            OPC协议设备
          </Box>
        </Box>
        <HStack flex={1} justifyContent="flex-end" spacing="4px">
          <IconWrapper bg={status !== 'offline' ? '#E8F7F7' : '#EFF4F9'}>
            {connectionIcon[status]}
          </IconWrapper>
          <IconWrapper bg={statusInfo.isSub ? '#E8F7F7' : '#79879C'}>
            <MessageWarningTwoToneIcon
              color={subscribe[statusInfo.isSub].color}
              twoToneColor={subscribe[statusInfo.isSub].twoToneColor}
            />
          </IconWrapper>
          <IconWrapper
            bg={isSelfLearn ? '#E9F2FF' : '#EFF4F9'}
            css={css`
              .vpc-icon-control {
                path {
                  &:first-child {
                    fill: ${selfLearn.color};
                  }

                  &:last-child {
                    fill: ${selfLearn.twoToneColor};
                  }
                }
              }
            `}
          >
            <VpcTwoToneIcon className="vpc-icon-control" />
          </IconWrapper>
        </HStack>
      </CardContentFlex>
      <HStack spacing="26px" fontSize="12px">
        <Text h="39px" lineHeight="39px">
          订阅地址
        </Text>
        <Text h="39px" lineHeight="39px" fontWeight={400}>
          pubsub://client-pubsub/core-pub
        </Text>
      </HStack>
    </VStack>
  );
}

export default DeviceInfoCard;
