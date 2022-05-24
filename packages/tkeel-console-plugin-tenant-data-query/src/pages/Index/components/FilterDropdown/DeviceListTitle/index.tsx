import { Box, Flex, Text } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';
import { GoBackFilledIcon } from '@tkeel/console-icons';

import {
  StatusSelect,
  StatusSelectProps,
} from '@/tkeel-console-plugin-tenant-data-query/components';

type Props = StatusSelectProps & {
  showBackButton: boolean;
  resultNum: number;
  onBackBtnClick: () => unknown;
};

export default function DeviceListTitle({
  resultNum,
  status,
  showBackButton,
  onStatusChange,
  onBackBtnClick,
}: Props) {
  const primaryColor = useColor('primary');
  return (
    <Flex marginBottom="8px" justifyContent="space-between" alignItems="center">
      <Flex
        alignItems="center"
        color="gray.800"
        fontSize="12px"
        lineHeight="24px"
      >
        {showBackButton && (
          <Box
            _hover={{
              '& > svg': {
                fill: `${primaryColor} !important`,
              },
            }}
            cursor="pointer"
            onClick={() => {
              onBackBtnClick();
              onStatusChange({
                label: '全部状态',
                value: 'all',
              });
            }}
          >
            <GoBackFilledIcon />
          </Box>
        )}
        <Flex marginLeft="10px">
          共
          <Text margin="0 3px" color="primary">
            {resultNum}
          </Text>
          条结果
        </Flex>
      </Flex>
      <StatusSelect status={status} onStatusChange={onStatusChange} />
    </Flex>
  );
}
