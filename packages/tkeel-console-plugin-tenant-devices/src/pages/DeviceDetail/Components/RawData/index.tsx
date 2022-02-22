import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Select,
  Text,
} from '@chakra-ui/react';
import { Editor, SearchInput } from '@tkeel/console-components';

import useDeviceDetailSocket, {
  RawData,
} from '@/tkeel-console-plugin-tenant-devices/hooks/webSockets/useDeviceDetailSocket';
import { OPTIONS } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

type Props = {
  id: string;
};

function Index({ id = '' }: Props) {
  const initial = {
    id: '',
    mark: 'upstream',
    path: '',
    ts: 1000,
    type: '',
    values: '',
  } as const;
  const [rawData, setRawData] = useState<RawData>(initial);
  const [keyWord, setKeyWord] = useState('');
  const result = useDeviceDetailSocket({ id });
  useEffect(() => {
    setRawData((preState) => {
      return { ...preState, ...result };
    });
  }, [result]);
  const selectOptions = [
    {
      value: 'json',
      label: 'json',
    },
    {
      value: '十六进制',
      label: '十六进制',
    },
  ];
  const handleSearch = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value, keyWord);
    setKeyWord(value);
  };

  const status = OPTIONS[rawData?.mark ?? 'upstream'];

  return (
    <Box>
      <Flex align="center" w="100%" h="56px">
        <Text>原始数据</Text>
        <Flex flex="1" justifyContent="flex-end">
          <SearchInput onSearch={handleSearch} placeholder="搜索" />
        </Flex>
        <Flex
          bg="gray.100"
          borderRadius="70px"
          pl="10px"
          minWidth="104px"
          ml="12px"
          fontSize="12px"
          h="32px"
          fontWeight="600"
          alignItems="center"
        >
          代码：
          <Select
            id="json"
            defaultValue="json"
            h="32px"
            fontWeight="600"
            fontSize="12px"
            textAlign="center"
            border="unset"
            _focus={{ boxShadow: 'none' }}
          >
            {selectOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Accordion allowMultiple p="12px 12px" bg="gray.50">
        <AccordionItem
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="4px"
          bg="white"
          mb="12px"
          p="10px 12px 10px 20px"
        >
          <AccordionButton _focus={{ boxShadow: 'none' }} p="unset">
            <Flex flex="1" fontSize="12px" alignItems="center">
              <Box
                bg={status.bg}
                color={status.color}
                w="42px"
                h="24px"
                textAlign="center"
                borderRadius="2px"
                fontWeight="600"
                lineHeight="2"
              >
                {status.desc}
              </Box>
              <Text fontWeight="700" m="0 38px 0 22px">
                {rawData.path}
              </Text>
              <Text color="grayAlternatives.300">2022-11-02 12:32:12</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Editor
              theme="light"
              value={JSON.stringify(
                JSON.parse(window.atob(rawData.values || '') || '{}'),
                null,
                2
              )}
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
