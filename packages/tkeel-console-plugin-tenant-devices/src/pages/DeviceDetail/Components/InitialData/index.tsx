import { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Editor, SearchInput } from '@tkeel/console-components';

function Index() {
  const [keyWord, setKeyWord] = useState('');
  const handleSearch = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value, keyWord);
    setKeyWord(value);
  };

  const data = {
    nih: 1231,
    wos: '我是',
    da: '低卡不能靠近北大街吧',
  };

  const options = [
    {
      desc: '上行',
      bg: '#FBF0E9',
      color: '#EB7C5A',
    },
    {
      desc: '下行',
      bg: '#F6F4FE',
      color: '#604CAF',
    },
    {
      desc: '连接',
      bg: '#E9F2FF',
      color: '#2580FF',
    },
  ];

  return (
    <Box>
      <Flex align="center" w="100%" h="56px">
        <Text>原始数据</Text>
        <Flex flex="1" justifyContent="flex-end">
          <SearchInput onSearch={handleSearch} placeholder="搜索" />
        </Flex>
        <Flex pl="12px">21</Flex>
      </Flex>
      <Accordion allowMultiple p="12px 12px" bg="gray.50">
        <AccordionItem
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="4px"
          p="10px 12px 10px 20px"
        >
          <AccordionButton _focus={{ boxShadow: 'none' }} p="unset">
            <Flex flex="1" fontSize="12px" alignItems="center">
              <Box
                bg={options[0].bg}
                color={options[0].color}
                w="42px"
                h="24px"
                textAlign="center"
                borderRadius="2px"
                fontWeight="600"
                lineHeight={2}
              >
                {options[0].desc}
              </Box>
              <Text fontWeight="700" m="0 38px 0 22px">
                topic/test
              </Text>
              <Text color="grayAlternatives.300">2022-11-02 12:32:12</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Editor
              value={JSON.stringify(data)}
              language="json"
              readOnly
              width="100%"
              height="144px"
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default Index;
