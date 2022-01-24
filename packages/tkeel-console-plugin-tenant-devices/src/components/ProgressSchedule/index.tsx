import { Fragment } from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { CheckFilledIcon } from '@tkeel/console-icons';

export interface Props {
  infos?: string[];
  currentStep?: number;
}
const STATUS = {
  DEFAULT: 0,
  PENDING: 1,
  COMPLETED: 2,
};
const FontColor = ['grayAlternatives.300', 'gray.700', 'primary'];
const BorderColor = ['gray.200', 'primary', 'primary'];
const DotFontColor = ['gray.400', 'white', 'white'];
const DotBgColor = ['gray.50', 'primary', 'primary'];

function renderProgressLine(status: number) {
  return (
    <Box
      flex="1"
      w="4px"
      h="auto"
      ml="10px"
      borderRadius="2px"
      bg={status !== STATUS.COMPLETED ? 'gray.100' : 'primary'}
    />
  );
}

function renderProgressDot(status: number, index: number, label: string) {
  return (
    <Flex h="48px" w="100%" align="center">
      <Center
        w="24px"
        h="24px"
        mr="8px"
        borderRadius="50%"
        color={DotFontColor[status]}
        bg={DotBgColor[status]}
        border="1px"
        borderColor={BorderColor[status]}
        fontSize="14px"
        lineHeight="24px"
        fontWeight="600"
      >
        {status === STATUS.COMPLETED ? <CheckFilledIcon /> : `0${index}`}
      </Center>
      <Box fontSize="12px" color={FontColor[status]} pos="relative">
        {label}
        {STATUS.COMPLETED === status && (
          <Text
            color="grayAlternatives.300"
            fontSize="12px"
            pos="absolute"
            top="20px"
          >
            已完成
          </Text>
        )}
      </Box>
    </Flex>
  );
}

function getStatus(idx: number, current: number) {
  return idx < current
    ? STATUS.COMPLETED
    : idx === current
    ? STATUS.PENDING
    : STATUS.DEFAULT;
}

export default function ProgressSchedule({
  infos = [],
  currentStep = 0,
}: Props) {
  return (
    <Flex h="100%" flexDirection="column">
      {infos.map((item, idx) => {
        return (
          <Fragment key={item}>
            {renderProgressDot(getStatus(idx, currentStep), idx + 1, item)}
            {idx !== infos.length - 1 &&
              renderProgressLine(getStatus(idx, currentStep))}
          </Fragment>
        );
      })}
    </Flex>
  );
}
