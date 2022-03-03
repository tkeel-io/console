import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';

import mockData from './mockData';

type Props = {
  style: StyleProps;
};

export default function DataTable({ style }: Props) {
  const columnNames = [
    '通信故障',
    'C相相角',
    'B相相角',
    '总正向有功电能',
    '频率',
    '总功率因数',
  ];
  return (
    <Flex {...style}>
      <Box>
        {columnNames.map((column) => (
          <Text key={column}>{column}</Text>
        ))}
      </Box>
      <Flex>
        {mockData.map((data) => (
          <Flex key={data.time}>
            <Text>{data.time}</Text>
            {Object.keys(data.value).map((key) => (
              <Text key={key}>{String(data.value[key])}</Text>
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
