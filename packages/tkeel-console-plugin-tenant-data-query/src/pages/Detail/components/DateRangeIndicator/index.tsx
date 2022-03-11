import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

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
  dateRangeLength: number;
  intervalTime: number;
  rangeIndex: number;
  setRangeIndex: Dispatch<SetStateAction<number>>;
};

export default function DateRangeIndicator({
  startTime,
  dateRangeLength,
  intervalTime,
  rangeIndex,
  setRangeIndex,
}: Props) {
  const percent = 100 / dateRangeLength;
  return (
    <Flex
      position="relative"
      flexDirection="column"
      justifyContent="flex-end"
      height="41px"
      border="1px solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
      cursor="pointer"
    >
      <Box
        position="absolute"
        left={`${rangeIndex * percent}%`}
        zIndex="1"
        bottom="4px"
        width={`${percent}%`}
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
      {Array.from({ length: dateRangeLength })
        .map((_, i) => i)
        .map((item) => {
          const arr = Array.from({
            length: item === dateRangeLength - 1 ? 11 : 10,
          }).fill('');

          return (
            <Flex
              key={item}
              marginBottom="4px"
              position="absolute"
              left={`${item * percent}%`}
              bottom="-3px"
              zIndex="1"
              width={`${percent}%`}
              height="100%"
              onClick={() => setRangeIndex(item)}
            >
              <Box
                position="absolute"
                bottom="16px"
                width="100%"
                height="1px"
                backgroundColor="gray.200"
              >
                {arr.map((_, i) => {
                  const showDate = i === 0 || i % 10 === 0;
                  let dateLeft = '-70px';
                  let dateRight = 'unset';
                  if (item === 0) {
                    dateLeft = '0';
                  }
                  if (i === 10) {
                    dateLeft = 'unset';
                    dateRight = '0';
                  }
                  const intervalNum =
                    item === dateRangeLength - 1 && i === 10
                      ? dateRangeLength
                      : item;
                  const timestamp =
                    (startTime + intervalTime * intervalNum) * 1000;
                  return (
                    <Box
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      position="absolute"
                      left={`${i * 10}%`}
                      bottom="0"
                      width="1px"
                      height="4px"
                      backgroundColor={
                        showDate ? 'grayAlternatives.300' : 'gray.200'
                      }
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
                            timestamp,
                          })}
                        </Text>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Flex>
          );
        })}
      <Flex
        position="relative"
        alignItems="center"
        width="100%"
        height="12px"
        padding="0 4px"
        backgroundColor="gray.100"
      >
        <Box
          position="relative"
          width="100%"
          height="4px"
          backgroundColor="primarySub2"
        />
      </Flex>
    </Flex>
  );
}
