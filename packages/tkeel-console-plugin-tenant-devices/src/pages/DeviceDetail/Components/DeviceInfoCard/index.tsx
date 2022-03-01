/* eslint-disable no-underscore-dangle */
import { Box, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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

import AddSubscribeButton from '@/tkeel-console-plugin-tenant-devices/components/AddSubscribeButton';
import DeleteDevicesButton from '@/tkeel-console-plugin-tenant-devices/components/DeleteDevicesButton';
import IconWrapper from '@/tkeel-console-plugin-tenant-devices/components/IconWrapper';
import UpdateDeviceButton from '@/tkeel-console-plugin-tenant-devices/components/UpdateDeviceButton';
import {
  BasicInfo,
  DeviceObject,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import {
  SELF_LEARN_COLORS,
  SUBSCRIBES,
} from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

import CardContentFlex from './components/CardContentFlex';

const connectionIcon = {
  offline: <WifiOffFilledIcon key="wifi-off" color="gray.500" />,
  online: <WifiFilledIcon key="wifi" color="green.300" />,
};

type Props = {
  deviceObject: DeviceObject;
  refetch: () => void;
};

function DeviceInfoCard({ deviceObject, refetch }: Props): JSX.Element {
  const navigate = useNavigate();
  const {
    id,
    properties: { sysField, basicInfo, connectInfo },
  } = deviceObject;
  const subscribeAddr = sysField?._subscribeAddr ?? '';
  const sub = subscribeAddr ? '1' : '0';
  const deviceName = basicInfo?.name ?? '';
  const isSelfLearn = basicInfo?.selfLearn;
  const selfLearnColors = isSelfLearn
    ? SELF_LEARN_COLORS[1]
    : SELF_LEARN_COLORS[0];
  const status = connectInfo?._online;

  const {
    name,
    description,
    directConnection,
    templateId,
    parentId,
    selfLearn,
    ext,
  } = (basicInfo || {}) as BasicInfo;
  const defaultFormValues = {
    id,
    selfLearn,
    description,
    templateId,
    directConnection,
    name,
    ext,
    parentId,
  };

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
          {basicInfo && (
            <MoreAction
              buttons={[
                <AddSubscribeButton key="add-subscribe" />,
                <UpdateDeviceButton
                  key="edit"
                  defaultFormValues={defaultFormValues}
                  refetch={refetch}
                />,
                <DeleteDevicesButton
                  ids={[id]}
                  key="delete-device"
                  deviceName={deviceName}
                />,
              ]}
            />
          )}
        </CardContentFlex>
        <CardContentFlex>
          <Box display="flex">
            <WebcamTwoToneIcon size="24px" style={{ marginLeft: '7px' }} />
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
                color={useColor(selfLearnColors.color)}
                twoToneColor={useColor(selfLearnColors.twoToneColor)}
              />
            </IconWrapper>
          </HStack>
        </CardContentFlex>
      </Box>
      <HStack spacing="26px" fontSize="12px" pl="20px">
        <Text h="39px" lineHeight="39px">
          默认订阅
        </Text>
        <Text h="39px" lineHeight="39px" fontWeight="400">
          {subscribeAddr}
        </Text>
      </HStack>
    </Box>
  );
}

export default DeviceInfoCard;
