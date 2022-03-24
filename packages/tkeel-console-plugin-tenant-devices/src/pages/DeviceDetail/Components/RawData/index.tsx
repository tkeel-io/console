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
import { Base64 } from 'js-base64';
import { isEmpty, throttle } from 'lodash';
import { useEffect, useState } from 'react';

import { AceEditor, Empty } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import { RawData } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import CustomEmpty from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/CustomEmpty';
import { OPTIONS } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/constants';

import CustomSelect from './components/CustomSelect';

type Props = {
  data: RawData;
  online: boolean;
};

const handleValues = (value: string, selected: string) => {
  const item = Base64.decode(value);
  if (selected === 'text') {
    if (item.startsWith('{')) {
      try {
        return JSON.stringify(JSON.parse(item), null, 2);
      } catch {
        return item;
      }
    }
    return item;
  }
  let val = '';
  const { length } = item;
  if (length === 0) return '';
  for (let i = 0; i < length; i += 1) {
    val += item.codePointAt(i)?.toString(16) || '';
  }
  return val;
};

type TRawData = RawData[];

function RawDataPanel({ data, online }: Props) {
  const [rawDataList, setRawDataList] = useState<TRawData>([]);
  const [selected, setSelected] = useState('text');
  const func = throttle(setRawDataList, 10 * 1000);

  const selectColor = useColor('gray.100');

  useEffect(() => {
    func((preState) => {
      if (isEmpty(data)) return [];
      const newData = { key: Math.random().toFixed(9), ...data };
      return [newData, ...preState].slice(0, 20);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (value: string) => {
    setSelected(value);
  };

  return online ? (
    <Box>
      <Flex align="center" w="100%" h="32px" lineHeight="32px" mb="12px">
        <Text fontWeight="600" fontSize="14px">
          原始数据
        </Text>
        <CustomSelect
          onChange={handleChange}
          color={selectColor}
          selected={selected}
        />
      </Flex>
      {!isEmpty(rawDataList) ? (
        <Accordion
          p="12px 12px"
          bg="gray.50"
          overflow="auto"
          height="calc(100vh + 10px)"
        >
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
                    <Flex
                      flex="1"
                      fontSize="12px"
                      alignItems="center"
                      justifyContent="space-start"
                    >
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
                      <Text
                        fontWeight="700"
                        m="0 38px 0 22px"
                        display="flex"
                        flexWrap="wrap"
                        maxWidth="600px"
                      >
                        {r.path}
                      </Text>
                      <Text
                        color="grayAlternatives.300"
                        mr="10px"
                        pr="20px"
                        width="150px"
                        minW="150px"
                        flex="1"
                        textAlign="right"
                      >
                        {formatDateTimeByTimestamp({
                          timestamp: `${Math.floor((r?.ts || 0) / 1e6)}`,
                        })}
                      </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel p="12px 0 0 0">
                    <AceEditor
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
      ) : (
        <Empty title="暂无数据" styles={{ wrapper: { height: '60%' } }} />
      )}
    </Box>
  ) : (
    <CustomEmpty />
  );
}

export default RawDataPanel;
