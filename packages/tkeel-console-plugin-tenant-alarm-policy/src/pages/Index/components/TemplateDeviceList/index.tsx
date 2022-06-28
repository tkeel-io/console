import { Box, Center, Flex, StyleProps, Text } from '@chakra-ui/react';

import { Loading } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  // BoxTwoToneIcon,
  GoBackFilledIcon,
  SmartObjectTwoToneIcon,
} from '@tkeel/console-icons';
import { DeviceItem } from '@tkeel/console-request-hooks';

type Props = {
  isLoading?: boolean;
  devices: DeviceItem[];
  onBackBtnClick: () => void;
  onClick: ({ id, name }: { id: string; name: string }) => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function TemplateDeviceList({
  isLoading,
  devices,
  onBackBtnClick,
  onClick,
  styles,
}: Props) {
  const primaryColor = useColor('primary');

  const deviceNameStyle: StyleProps = {
    marginLeft: '10px',
    color: 'gray.700',
    fontSize: '14px',
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      {...styles?.wrapper}
    >
      {!isLoading && (
        <Flex
          alignItems="center"
          color="gray.800"
          fontSize="12px"
          lineHeight="24px"
        >
          <Box
            _hover={{
              '& > svg': {
                fill: `${primaryColor} !important`,
              },
            }}
            cursor="pointer"
            onClick={onBackBtnClick}
          >
            <GoBackFilledIcon />
          </Box>
          <Flex marginLeft="10px">
            共
            <Text margin="0 3px" color="primary">
              {devices.length}
            </Text>
            条结果
          </Flex>
        </Flex>
      )}
      <Flex flexDirection="column" marginTop="8px" flex="1">
        {(() => {
          if (isLoading) {
            return (
              <Center flex="1">
                <Loading />
              </Center>
            );
          }

          // if (devices.length === 0) {
          //   return (
          //     <Empty
          //       type="component"
          //       title="暂无设备,请重新选择"
          //       styles={{
          //         wrapper: { flex: 1 },
          //       }}
          //     />
          //   );
          // }

          return (
            <>
              {/* <Flex
                paddingLeft="10px"
                alignItems="center"
                cursor="pointer"
                onClick={() => {
                  onClick({
                    id: '',
                    name: '',
                  });
                }}
              >
                <BoxTwoToneIcon size={20} />
                <Text {...deviceNameStyle}>全部设备</Text>
              </Flex> */}
              {devices.map((device, i) => {
                const { id, properties } = device;
                const name = properties?.basicInfo?.name ?? '';
                return (
                  <Flex
                    key={id || i}
                    alignItems="center"
                    width="100%"
                    marginBottom={i === devices.length - 1 ? '0' : '4px'}
                    paddingLeft="10px"
                    height="32px"
                    cursor="pointer"
                    _hover={{
                      backgroundColor: 'grayAlternatives.50',
                    }}
                    onClick={() => {
                      onClick({
                        id,
                        name,
                      });
                    }}
                  >
                    <Flex alignItems="center">
                      <SmartObjectTwoToneIcon size={20} />
                      <Text {...deviceNameStyle}>{name}</Text>
                    </Flex>
                  </Flex>
                );
              })}
            </>
          );
        })()}
      </Flex>
    </Flex>
  );
}
