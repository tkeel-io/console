import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

function Indicator(props: StyleProps) {
  return (
    <Box
      position="absolute"
      bottom="-2px"
      width="4px"
      height="8px"
      backgroundColor="primary"
      {...props}
    />
  );
}

type Props = {
  startTime: number;
  endTime: number;
  rangeStartTime: number;
};

export default function DateRangeIndicator({
  startTime,
  endTime,
  rangeStartTime,
}: Props) {
  const length = Math.ceil((endTime - startTime) / 1000);
  const arr = Array.from({ length: length + 1 }).fill('');
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  const unitWidth = 30;
  const rangeLeft = ((rangeStartTime - startTime) / 1000) * unitWidth;

  const rangeWidth = unitWidth * 5;

  useEffect(() => {
    const { current: dateRangeCurrent } = dateRangeRef;
    const { current: indicatorCurrent } = indicatorRef;
    if (!dateRangeCurrent || !indicatorCurrent) return;
    const dateRangeWidth = dateRangeCurrent.clientWidth;
    const needMoveLeft = rangeLeft > dateRangeWidth - rangeWidth;

    if (needMoveLeft) {
      const subWidth =
        indicatorCurrent.clientWidth -
        Number(indicatorCurrent.style.left) +
        dateRangeWidth;
      const canMoveLeftFullRange = indicatorCurrent && subWidth >= rangeWidth;
      const moveLeftValue = canMoveLeftFullRange ? rangeWidth : subWidth;
      setIndicatorLeft(indicatorLeft - moveLeftValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeLeft]);

  return (
    <Flex
      ref={dateRangeRef}
      position="relative"
      flexDirection="column"
      justifyContent="flex-end"
      height="41px"
      overflow="auto"
      border="1px solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
    >
      <Box
        ref={indicatorRef}
        marginBottom="4px"
        position="relative"
        left={`${indicatorLeft + 4}px`}
        zIndex="1"
        width={length * unitWidth}
        height="1px"
        backgroundColor="gray.200"
      >
        {arr.map((_, i) => {
          const showDate = i === 0 || i % 10 === 0;
          let dateLeft = '-30px';
          let dateRight = 'unset';
          if (i === 0) {
            dateLeft = '0';
          }
          if (i >= arr.length - 5) {
            dateLeft = 'unset';
            dateRight = '0';
          }
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              position="absolute"
              left={`${i * 30}px`}
              bottom="0"
              width="1px"
              height="4px"
              backgroundColor={showDate ? 'grayAlternatives.300' : 'gray.200'}
            >
              {showDate && (
                <Text
                  position="absolute"
                  left={dateLeft}
                  right={dateRight}
                  bottom="2px"
                  width="130px"
                  color="gray.700"
                  fontSize="12px"
                >
                  {formatDateTimeByTimestamp({
                    timestamp: startTime + 1000 * i,
                  })}
                </Text>
              )}
            </Box>
          );
        })}
      </Box>
      <Flex
        position="relative"
        left={`${indicatorLeft}px`}
        alignItems="center"
        width={length * unitWidth + 8}
        height="12px"
        padding="0 4px"
        backgroundColor="gray.100"
      >
        <Box
          position="relative"
          width="100%"
          height="4px"
          backgroundColor="primarySub2"
        >
          <Box
            position="absolute"
            left={`${rangeLeft}px`}
            bottom="0"
            width="150px"
            height="35px"
            backgroundColor="primarySub"
          >
            <Indicator left="0" />
            <Box
              position="absolute"
              left="0"
              bottom="0"
              width="100%"
              height="4px"
              backgroundColor="primary"
              opacity="0.5"
            />
            <Indicator right="0" />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
