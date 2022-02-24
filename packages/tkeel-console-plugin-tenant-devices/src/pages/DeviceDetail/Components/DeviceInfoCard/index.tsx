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

import DeleteDevicesButton from '@/tkeel-console-plugin-tenant-devices/components/DeleteDevicesButton';
import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import UnsubscribeButton from '@/tkeel-console-plugin-tenant-devices/components/UnsubscribeButton';
import { SUBSCRIBES } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

type Props = {
  selfLearn: {
    color: string;
    twoToneColor: string;
  };
  id: string;
  isSelfLearn: boolean | undefined;
  status: boolean | undefined;
  deviceName: string;
  subscribeAddr: string;
};

const connectionIcon = {
  offline: <WifiOffFilledIcon key="wifi-off" color="gray.500" />,
  online: <WifiFilledIcon key="wifi" color="green.300" />,
};

function DeviceInfoCard({
  id,
  selfLearn,
  subscribeAddr,
  isSelfLearn,
  status,
  deviceName,
}: Props): JSX.Element {
  const navigate = useNavigate();
  const sub = subscribeAddr ? '1' : '0';

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
              <DeleteDevicesButton
                ids={[id]}
                key="delete"
                deviceName={deviceName}
              />,
              <UnsubscribeButton
                id={id}
                key="cancel-subscribe"
                disabled={!subscribeAddr}
                deviceName={deviceName}
              />,
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
            <IconWrapper iconBg={useColor(status ? 'green.50' : 'gray.100')}>
              {connectionIcon[status ? 'online' : 'offline']}
            </IconWrapper>
            <IconWrapper
              iconBg={useColor(subscribeAddr ? 'teal.50' : 'gray.100')}
            >
              <MessageWarningTwoToneIcon
                color={useColor(SUBSCRIBES[sub].color)}
                twoToneColor={useColor(SUBSCRIBES[sub].twoToneColor)}
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
