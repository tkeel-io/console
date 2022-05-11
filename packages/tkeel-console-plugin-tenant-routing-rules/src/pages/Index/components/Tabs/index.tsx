import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  onClick: (e: number) => unknown;
};

export default function Tabs({ onClick }: Props) {
  const tabArrInfo = [
    {
      key: '1',
      name: '全部',
      keyWords: 0,
      active: true,
    },
    {
      key: '2',
      name: '消息路由',
      keyWords: 1,
      active: false,
    },
    {
      key: '3',
      name: '时序路由',
      keyWords: 2,
      active: false,
    },
  ];
  const [tabArr, setTabArr] = useState(tabArrInfo);

  return (
    <Flex
      w="240px"
      p="2px"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      borderRadius="70px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grayAlternatives.100"
    >
      {tabArr.map((item, index) => {
        const { key, name, keyWords, active } = item;
        return (
          <Box
            key={key}
            w="76px"
            p="6px 0"
            borderRadius="70px"
            cursor="pointer"
            fontSize="12px"
            textAlign="center"
            bg={active ? 'gray.700' : 'white'}
            color={active ? 'white' : 'gray.600'}
            onClick={() => {
              const newTabArr = tabArr.map((tab, i) => {
                tabArr[i].active = i === index;
                return tab;
              });
              setTabArr(newTabArr);
              onClick(keyWords);
            }}
          >
            {name}
          </Box>
        );
      })}
    </Flex>
  );
}
