import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  onClick: (e: string) => unknown;
};

export default function Tabs({ onClick }: Props) {
  const tabArrInfo = [
    {
      key: '1',
      name: '全部',
      keyWords: '',
      active: true,
    },
    {
      key: '2',
      name: '消息路由',
      keyWords: 'msg',
      active: false,
    },
    {
      key: '3',
      name: '时序路由',
      keyWords: 'time',
      active: false,
    },
  ];
  const [tabArr, setTabArr] = useState(tabArrInfo);

  return (
    <Flex
      w="376px"
      m="8px 0 20px"
      alignItems="center"
      bg="white"
      borderRadius="70px"
    >
      {tabArr.map((item, index) => {
        const { key, name, keyWords, active } = item;
        return (
          <Box
            key={key}
            padding="6px 36px"
            borderRadius="70px"
            cursor="pointer"
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
