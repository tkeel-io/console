import { Flex, StyleProps } from '@chakra-ui/react';

import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import mockData from './mockData';

type Props = {
  style: StyleProps;
};

const getRowBackgroundColor = (index: number) => {
  return index % 2 === 0 ? 'gray.50' : 'white';
};

export default function DataTable({ style }: Props) {
  const columnNames = ['通信故障', 'C相相角', 'B相相角', '频率', '总功率因数'];

  const rowHeight = '40px';
  return (
    <Flex overflowY="auto" {...style}>
      <Flex height="max-content" flexDirection="column">
        {columnNames.map((column, i) => (
          <Flex
            key={column}
            alignItems="center"
            paddingLeft="12px"
            width="130px"
            height={rowHeight}
            color="gray.700"
            fontSize="12px"
            fontWeight="600"
            backgroundColor={getRowBackgroundColor(i)}
          >
            {column}
          </Flex>
        ))}
      </Flex>
      <Flex flex="1" overflow="auto">
        <Flex>
          {mockData.map((data) => (
            <Flex
              key={data.time}
              flexDirection="column"
              width="100px"
              color="gray.500"
              fontSize="12px"
            >
              <Flex
                alignItems="center"
                height={rowHeight}
                whiteSpace="pre-wrap"
                backgroundColor="gray.50"
              >
                {formatDateTimeByTimestamp({
                  timestamp: data.time,
                  template: 'MM/DD HH:mm:ss',
                }).replace(' ', '\r\n')}
              </Flex>
              {Object.keys(data.value).map((key, i) => (
                <Flex
                  key={key}
                  height={rowHeight}
                  alignItems="center"
                  backgroundColor={getRowBackgroundColor(i - 1)}
                >
                  {String(data.value[key])}
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
