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
import { useEffect, useState } from 'react';

// import { Editor, SearchInput } from '@tkeel/console-components';
import { Editor } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { RawData } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import { OPTIONS } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

import CustomSelect from './components/CustomSelect';

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

type TRawData = RawData[];

function RawDataPanel({ data }: Props) {
  const [rawDataList, setRawDataList] = useState<TRawData>([]);
  // const [keyWord, setKeyWord] = useState('');
  const [selected, setSelected] = useState('text');
  const func = throttle(setRawDataList, 10 * 1000);

  useEffect(() => {
    func((preState) => {
      if (isEmpty(data)) return [];
      const newData = { key: Math.random().toFixed(9), ...data };
      if (preState.length > 10) return [newData];
      return [newData, ...preState];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (value: string) => {
    setSelected(value);
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
        {/* <Flex flex="1" justifyContent="flex-end">
          <SearchInput onSearch={handleSearch} placeholder="搜索" />
        </Flex> */}
        <CustomSelect onChange={handleChange} color={useColor('gray.100')} />
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
                  <AccordionPanel p="12px 0 0 0">
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
    </Box>
  );
}

export default RawDataPanel;
