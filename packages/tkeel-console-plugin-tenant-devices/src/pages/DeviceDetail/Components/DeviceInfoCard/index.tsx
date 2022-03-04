/* eslint-disable no-underscore-dangle */
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BackButton, MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  MessageWarningTwoToneIcon,
  MgmtNodeTwoToneIcon,
  OfficialFilledIcon,
  VpcTwoToneIcon,
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
import handleSubscribeAddr from '@/tkeel-console-plugin-tenant-devices/utils';

import CardContentFlex from './components/CardContentFlex';
import Clipboard from './components/Clipboard';
import UnsubscribeButton from './components/UnsubscribeButton';

const connectionIcon = {
  offline: <WifiOffFilledIcon key="wifi-off" color="gray.500" />,
  online: <WifiFilledIcon key="wifi" color="green.300" />,
};

type Props = {
  deviceObject: DeviceObject;
  refetch?: () => void;
};

function DeviceInfoCard({ deviceObject, refetch }: Props): JSX.Element {
  const navigate = useNavigate();
  const {
    id,
    properties: { sysField, basicInfo, connectInfo },
  } = deviceObject;
  const subscribeAddr = sysField?._subscribeAddr ?? '';
  const addrList = handleSubscribeAddr(subscribeAddr);

  const sub = addrList.length > 0 ? '1' : '0';
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
                <AddSubscribeButton
                  key="add-subscribe"
                  deviceId={id}
                  addrList={addrList}
                  refetch={refetch}
                />,
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
            <MgmtNodeTwoToneIcon size="24px" style={{ marginLeft: '7px' }} />
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
      <Flex
        p="0 20px 0"
        flexDirection="column"
        justifyContent="center"
        mt="9px"
      >
        {addrList.map((r) => {
          return (
            <HStack spacing="26px" fontSize="12px" key={r.id} mb="4px">
              <Text h="24px" lineHeight="24px">
                {r.title}
              </Text>
              <Flex
                position="relative"
                flex="1"
                alignItems="center"
                _hover={{
                  '& > div': {
                    display: 'flex !important',
                  },
                }}
              >
                <Text
                  h="24px"
                  lineHeight="24px"
                  fontWeight="400"
                  isTruncated
                  width="180px"
                >
                  {r.addr}
                </Text>
                <Flex position="absolute" right="0" display="none">
                  {r.addr && <Clipboard text={r.addr} />}
                  <UnsubscribeButton
                    deviceId={id}
                    subscribeId={r.id}
                    subscribeAddr={r.addr}
                    refetch={refetch}
                  />
                </Flex>
              </Flex>
            </HStack>
          );
        })}
      </Flex>
    </Box>
  );
}

export default DeviceInfoCard;
