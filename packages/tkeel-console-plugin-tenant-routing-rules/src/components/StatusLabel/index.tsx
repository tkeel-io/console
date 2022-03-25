import { Box, Flex, SpinnerProps, StyleProps, Text } from '@chakra-ui/react';

interface Props extends SpinnerProps {
  status: number;
  styles?: {
    wrapper?: StyleProps;
  };
}

type StatusItem = { label: string; color: string };

type StatusInfo = StatusItem[];

function StatusLabel({ styles, status }: Props) {
  const statusInfo: StatusInfo = [
    {
      label: '未启动',
      color: 'gray.300',
    },
    {
      label: '已启动',
      color: 'success.300',
    },
  ];
  return (
    <Flex alignItems="center" {...styles?.wrapper}>
      <Box
        w="6px"
        h="6px"
        bg={statusInfo[status].color}
        borderRadius="50%"
        mr="4px"
      />
      <Text fontSize="12px">{statusInfo[status].label}</Text>
    </Flex>
  );
}

export default StatusLabel;
