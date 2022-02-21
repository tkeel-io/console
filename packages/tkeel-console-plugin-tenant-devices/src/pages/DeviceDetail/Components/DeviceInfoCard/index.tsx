import { useNavigate } from 'react-router-dom';
import { Box, HStack, Text } from '@chakra-ui/react';
import { BackButton, MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  MessageWarningTwoToneIcon,
  OfficialFilledIcon,
  VpcTwoToneIcon,
  WebcamTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';

import CardContentFlex from './components/CardContentFlex';

import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import {
  STATUS_INFOS,
  SUBSCRIBES,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';
import CreateDeviceButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateDeviceButton';
import CreateDeviceGroupButton from '@/tkeel-console-plugin-tenant-devices/pages/Index/components/CreateDeviceGroupButton';

type Props = {
  selfLearn: {
    color: string;
    twoToneColor: string;
  };
  isSelfLearn: boolean | undefined;
  status: string;
  deviceName: string;
  subscribeAddr: string;
};

const connectionIcon = {
  offline: <WifiOffFilledIcon key="wifi-off" />,
  online: <WifiFilledIcon key="wifi" />,
};

function DeviceInfoCard({
  selfLearn,
  subscribeAddr,
  isSelfLearn,
  status,
  deviceName,
}: Props): JSX.Element {
  const navigate = useNavigate();

  return (
    <Box position="relative" w="100%" bg="white" borderRadius="4px">
      <Box
        p="20px 12px 0 13px"
        h="108px"
        bg={`linear-gradient(180deg, ${useColor('white')} 0%, ${useColor(
          'gray.50'
        )} 100%)`}
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
        <CardContentFlex mb="28px">
          <BackButton
            onClick={() => {
              navigate('/');
            }}
          />
          <MoreAction
            buttons={[
              <CreateDeviceButton key="device" />,
              <CreateDeviceGroupButton key="device-group" />,
            ]}
          />
        </CardContentFlex>
        <CardContentFlex>
          <Box display="flex">
            <WebcamTwoToneIcon
              size="24px"
              style={{ marginLeft: '7px' }}
              color="primary"
              twoToneColor="primarySub2"
            />
            <Box as="span" fontSize="14px" fontWeight="600" ml="8px">
              {deviceName}
            </Box>
          </Box>
          <HStack flex="1" justifyContent="flex-end" spacing="8px" zIndex="3">
            <IconWrapper
              iconBg={useColor(status !== 'offline' ? 'green.50' : 'gray.100')}
            >
              {connectionIcon[status]}
            </IconWrapper>
            <IconWrapper
              iconBg={useColor(STATUS_INFOS.isSub ? 'teal.50' : 'gray.100')}
            >
              <MessageWarningTwoToneIcon
                color={useColor(SUBSCRIBES[STATUS_INFOS.isSub].color)}
                twoToneColor={useColor(
                  SUBSCRIBES[STATUS_INFOS.isSub].twoToneColor
                )}
              />
            </IconWrapper>
            <IconWrapper
              iconBg={useColor(isSelfLearn ? 'blue.50' : 'gray.100')}
            >
              <VpcTwoToneIcon
                color={useColor(selfLearn.color)}
                twoToneColor={useColor(selfLearn.twoToneColor)}
              />
            </IconWrapper>
          </HStack>
        </CardContentFlex>
      </Box>
      <HStack spacing="26px" fontSize="12px" pl="20px">
        <Text h="39px" lineHeight="39px">
          订阅地址
        </Text>
        <Text h="39px" lineHeight="39px" fontWeight="400">
          {subscribeAddr}
        </Text>
      </HStack>
    </Box>
  );
}

export default DeviceInfoCard;
