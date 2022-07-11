import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
  DeviceStatusIcon,
  IconWrapper,
  SelfLearnIcon,
} from '@tkeel/console-business-components';
import { BackButton, Clipboard, MoreAction } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  MessageWarningTwoToneIcon,
  OfficialFilledIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import AddSubscribeButton from '@/tkeel-console-plugin-tenant-devices/components/AddSubscribeButton';
import DeleteDevicesButton from '@/tkeel-console-plugin-tenant-devices/components/DeleteDevicesButton';
import UpdateDeviceButton from '@/tkeel-console-plugin-tenant-devices/components/UpdateDeviceButton';
import useUpdateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateDeviceMutation';
import {
  BasicInfo,
  DeviceObject,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import { SUBSCRIBES } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';
import handleSubscribeAddr from '@/tkeel-console-plugin-tenant-devices/utils';

import CardContentFlex from './components/CardContentFlex';
import UnsubscribeButton from './components/UnsubscribeButton';

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
  // eslint-disable-next-line no-underscore-dangle
  const subscribeAddr = sysField?._subscribeAddr ?? '';
  const addrList = handleSubscribeAddr(subscribeAddr);
  const toast = plugin.getPortalToast();

  const sub = addrList.length > 0 ? '1' : '0';
  const deviceName = basicInfo?.name ?? '';
  const isSelfLearn = basicInfo?.selfLearn;
  // eslint-disable-next-line no-underscore-dangle
  const isOnline = connectInfo?._online ?? false;

  const { mutate } = useUpdateDeviceMutation({
    id,
    onSuccess: () => {
      toast.success('操作成功');
      if (refetch) {
        refetch();
      }
    },
  });

  const handleClick = () => {
    if (deviceObject) {
      const data = {
        ...basicInfo,
        selfLearn: !isSelfLearn,
      };
      mutate({ data: data as BasicInfo });
    }
  };

  const {
    name,
    description,
    directConnection,
    templateId,
    parentId,
    templateName,
    selfLearn,
    ext,
    extBusiness,
  } = basicInfo || {};
  const defaultFormValues = {
    id,
    selfLearn,
    description,
    templateId,
    templateName,
    directConnection,
    name,
    ext,
    extBusiness,
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
            <SmartObjectTwoToneIcon size="24px" style={{ marginLeft: '7px' }} />
            <Box as="span" fontSize="14px" fontWeight="600" ml="8px">
              {deviceName}
            </Box>
          </Box>
          <HStack flex="1" justifyContent="flex-end" spacing="8px" zIndex="3">
            <DeviceStatusIcon isOnline={isOnline} />
            <IconWrapper bg={subscribeAddr ? 'teal.50' : 'gray.100'}>
              <MessageWarningTwoToneIcon
                size="20px"
                color={useColor(SUBSCRIBES[sub].color)}
                twoToneColor={useColor(SUBSCRIBES[sub].twoToneColor)}
              />
            </IconWrapper>
            <SelfLearnIcon
              isSelfLearn={isSelfLearn}
              handleClick={handleClick}
            />
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
              <Text lineHeight="24px" maxW="76px">
                {r.title}
              </Text>
              <Flex
                position="relative"
                flex="1"
                alignItems="center"
                justifyContent="space-between"
                pr="60px"
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
                  noOfLines={1}
                  width="160px"
                >
                  {r.addr}
                </Text>
                <Flex position="absolute" right="0" display="none">
                  {r.addr && <Clipboard text={r.addr} />}
                  <UnsubscribeButton
                    deviceId={id}
                    subscribeId={r.id}
                    subscribeDesc={r.title}
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
