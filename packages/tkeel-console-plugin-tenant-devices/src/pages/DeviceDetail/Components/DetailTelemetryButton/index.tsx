import {
  Box,
  Center,
  Flex,
  HStack,
  Spacer,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { Drawer, MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon, WebcamTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { TelemetryItem } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

type Props = {
  telemetryInfo: TelemetryItem;
};

function getDetailData(data: TelemetryItem) {
  return [
    { label: '遥测ID', value: data.id },
    { label: '遥测值', value: '' },
    {
      label: '时间戳',
      value: formatDateTimeByTimestamp({ timestamp: data.last_time }),
    },
    { label: '数据类型', value: data.type },
  ];
}
export default function DetailTelemetryButton({ telemetryInfo }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, description } = telemetryInfo;
  const detailData = getDetailData(telemetryInfo);
  return (
    <>
      <MoreActionButton
        icon={<EyeFilledIcon size="12px" color="grayAlternatives.300" />}
        title="查看详情"
        onClick={onOpen}
      />
      <Drawer title={`遥测「${name}」详情`} isOpen={isOpen} onClose={onClose}>
        <HStack
          p="18px 24px"
          spacing="20px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="grayAlternatives.50"
        >
          <Center w="76px" h="76px" bg="gray.50" borderRadius="50%">
            <WebcamTwoToneIcon size="27px" />
          </Center>
          <VStack spacing="4px" align="stretch">
            <Text fontSize="16px" lineHeight="24px" fontWeight="500">
              {name}
            </Text>
            <Text
              fontWeight="400"
              fontSize="12px"
              lineHeight="24px"
              color="grayAlternatives.300"
            >
              {description || '暂无描述'}
            </Text>
          </VStack>
        </HStack>
        <Box p="24px">
          <Flex align="center" h="24px" mb="10px">
            <Text lineHeight="24px" fontWeight="400" fontSize="14px">
              基本信息
            </Text>
            <Spacer />
            <HStack>
              <Switch size="sm" colorScheme="primary" />
              <Text fontSize="12px" color="gray.500" lineHeight="24px">
                json格式
              </Text>
            </HStack>
          </Flex>
          <Box p="16px 24px" bg="gray.50">
            {detailData.map((item) => (
              <Flex
                align="flex-start"
                flexDir="row"
                key={item.label}
                fontSize="12px"
                lineHeight="24px"
              >
                <Text width="80px" color="grayAlternatives.300">
                  {item.label}
                </Text>
                <Text flex="1" color="gray.700">
                  {item.value}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
