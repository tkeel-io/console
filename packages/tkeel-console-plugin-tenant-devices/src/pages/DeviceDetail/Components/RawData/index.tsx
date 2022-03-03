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
import { isEmpty, throttle } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// import { Editor, SearchInput } from '@tkeel/console-components';
import { Editor, Select } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

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

type TRawData = RawData[];

const kjh = {
  id: '23423',
  key: '213',
  type: 'rawData',
  mark: 'upstream',
  path: 'rawData/upstream',
  ts: 1_645_584_837_960_616_400,
  values: 'ZGRkZGRkZGRkZA==',
};

function RawDataPanel({ data }: Props) {
  const [rawDataList, setRawDataList] = useState<TRawData>([]);
  // const [keyWord, setKeyWord] = useState('');
  const [selected, setSelected] = useState('text');
  useCallback(() => {
    throttle(setRawDataList, 200);
  }, []);
  useEffect(() => {
    setRawDataList((preState) => {
      if (isEmpty(data)) return [];
      const newData = { key: Math.random().toFixed(9), ...data };
      if (preState.length > 10) return [newData];
      return [newData, ...preState];
    });
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  // const handleSearch = (value: string) => {
  //   // eslint-disable-next-line no-console
  //   console.log(value, keyWord);
  //   setKeyWord(value);
  // };

  return (
    <Box>
      <Flex align="center" w="100%" h="56px">
        <Text fontWeight="600">原始数据</Text>
        <Flex flex="1" justifyContent="flex-end">
          {/* <SearchInput onSearch={handleSearch} placeholder="搜索" /> */}
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
            style={{ width: '100%' }}
            showArrow
            options={selectOptions}
            onChange={handleChange}
          />
        </Flex>
      </Flex>
      {!isEmpty(rawDataList) && (
        <Accordion p="12px 12px" bg="gray.50" maxH="600px" overflow="auto">
          {rawDataList.map((r) => {
            const status = OPTIONS[r?.mark ?? 'upstream'];

            return (
              !isEmpty(r) && (
                <AccordionItem
                  key={r.key}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="4px"
                  bg="white"
                  mb="12px"
                  p="10px 12px 10px 12px"
                >
                  <AccordionButton
                    _focus={{ boxShadow: 'none' }}
                    p="unset"
                    ml="8px"
                  >
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
                        {r.path}
                      </Text>
                      <Text color="grayAlternatives.300" flex="1">
                        {formatDateTimeByTimestamp({
                          timestamp: `${Math.floor((r?.ts || 0) / 1e6)}`,
                        })}
                      </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel p="12px 0 0 0" ml="-8px">
                    <Editor
                      theme="light"
                      value={handleValues(r?.values || '', selected)}
                      language="json"
                      readOnly
                      width="100%"
                      height="144px"
                    />
                  </AccordionPanel>
                </AccordionItem>
              )
            );
          })}
        </Accordion>
      )}
      <Editor
        theme="light"
        value={JSON.stringify(kjh, null, 2)}
        language="json"
        readOnly
        width="100%"
        height="144px"
      />
    </Box>
  );
}

export default RawDataPanel;
