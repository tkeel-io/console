import { ChangeEvent, useEffect, useState } from 'react';
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

import { RawData } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import { OPTIONS } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

type Props = {
  data: RawData;
};

const handleValues = (value: string, selected: string) => {
  const str = window.atob(value);
  if (selected === 'text') {
    return JSON.stringify(str.startsWith('{') ? JSON.parse(str) : str, null, 2);
  }
  let val = '';
  const { length } = str;
  if (length === 0) return '';
  for (let i = 0; i < length; i += 1) {
    val += str.codePointAt(i)?.toString(16) || '';
  }
  return val;
};

const selectOptions = [
  {
    value: 'text',
    label: '文本',
  },
  {
    value: '十六进制',
    label: '十六进制',
  },
];

function Index({ data }: Props) {
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
  const [selected, setSelected] = useState('text');
  useEffect(() => {
    setRawData((preState) => {
      return { ...preState, ...data };
    });
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleSearch = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value, keyWord);
    setKeyWord(value);
  };

  const status = OPTIONS[rawData?.mark ?? 'upstream'];

  return (
    <Box>
      <Flex align="center" w="100%" h="56px">
        <Text fontWeight="600">原始数据</Text>
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
          <Select
            id="format-selected"
            onChange={handleChange}
            defaultValue={selected}
            isFullWidth
            border="unset"
            _focus={{ boxShow: 'none' }}
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
          p="10px 12px 10px 12px"
        >
          <AccordionButton _focus={{ boxShadow: 'none' }} p="unset" ml="8px">
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
          <AccordionPanel p="12px 0 0 0">
            <Editor
              theme="light"
              value={handleValues(rawData?.values || '', selected)}
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
