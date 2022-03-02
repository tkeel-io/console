import { Box, Flex, Text } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';
import { GoBackFilledIcon } from '@tkeel/console-icons';

import StatusSelect, { StatusSelectProps } from '../StatusSelect';

type Props = StatusSelectProps & {
  resultNum: number;
  onBackBtnClick: () => unknown;
};

export default function DeviceListTitle({
  resultNum,
  status,
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
            {resultNum}
          </Text>
          条结果
        </Flex>
      </Flex>
      <StatusSelect status={status} onStatusChange={onStatusChange} />
    </Flex>
  );
}
