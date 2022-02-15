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
import { SearchInput } from '@tkeel/console-components';

function Index() {
  const [keyWord, setKeyWord] = useState('');
  const handleSearch = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value, keyWord);
    setKeyWord(value);
  };

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
        <AccordionItem border="1px" borderRadius="4px" p="10px 12px 10px 20px">
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>32412</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default Index;
