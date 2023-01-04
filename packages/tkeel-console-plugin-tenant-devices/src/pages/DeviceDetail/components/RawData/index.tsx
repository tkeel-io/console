import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import { isEmpty, throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { RawDataConnectTypeLabel } from '@tkeel/console-business-components';
import { Empty, MoreActionSelect } from '@tkeel/console-components';
import {
  formatDateTimeByTimestamp,
  formatRawValue,
  hasJsonStructure,
} from '@tkeel/console-utils';

import { RawData } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import CustomEmpty from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/CustomEmpty';

import CreateUpstreamDataButton from '../CreateDownstreamDataButton';

type Props = {
  data: RawData;
  online: boolean;
  deviceId: string;
};

type TRawData = RawData[];

function RawDataPanel({ data, online, deviceId }: Props) {
  const [rawDataList, setRawDataList] = useState<TRawData>([]);
  const [selected, setSelected] = useState<'text' | 'hex'>('text');
  const func = throttle(setRawDataList, 10 * 1000);

  useEffect(() => {
    func((preState) => {
      if (isEmpty(data)) return preState;
      const newData = { key: Math.random().toFixed(9), ...data };
      return [newData, ...preState].slice(0, 20);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const rawDataTypeOptions = [
    { label: '文本', value: 'text' },
    { label: '十六进制', value: 'hex' },
  ];

  if (!online) {
    return <CustomEmpty />;
  }

  return (
    <Box>
      <Flex align="center" w="100%" h="32px" lineHeight="32px" mb="12px">
        <Text fontWeight="600" fontSize="14px" mr="16px">
          原始数据
        </Text>
        <Spacer />
        <MoreActionSelect
          options={rawDataTypeOptions}
          value={selected}
          onChange={(value) => setSelected(value as 'text' | 'hex')}
          styles={{ wrapper: { marginRight: '8px' } }}
        />
        <CreateUpstreamDataButton deviceId={deviceId} />
      </Flex>
      {!isEmpty(rawDataList) ? (
        <Accordion
          p="12px 12px"
          bg="gray.50"
          overflow="auto"
          height="calc(100vh + 10px)"
        >
          {rawDataList.map((r) => {
            const value = Base64.decode(r?.values ?? '');
            const isJsonStr = selected === 'text' && hasJsonStructure(value);
            const language = isJsonStr ? 'json' : 'text';
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
                      <RawDataConnectTypeLabel connectType={r?.mark ?? ''} />
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
                        {r?.ts
                          ? formatDateTimeByTimestamp({
                              timestamp: r?.ts,
                            })
                          : ''}
                      </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel p="12px 0 0 0">
                    {/* <AceEditor
                      theme="light"
                      value={formatRawValue({
                        value,
                        type: selected,
                      })}
                      language={language}
                      readOnly
                      width="100%"
                      height="144px"
                    /> */}
                    <SyntaxHighlighter
                      language={language}
                      style={materialLight}
                      customStyle={{ fontSize: '12px' }}
                      showLineNumbers
                      wrapLines
                      wrapLongLines
                    >
                      {formatRawValue({
                        value,
                        type: selected,
                      })}
                    </SyntaxHighlighter>
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
  );
}

export default RawDataPanel;
