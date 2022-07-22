import { Box, Flex, Text } from '@chakra-ui/react';
import { filter, isEmpty, omit, some, throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  CreateTelemetryButton,
  DeleteTelemetryButton,
  SaveAsOtherTemplateButton,
  SaveTelemetryButton,
} from '@tkeel/console-business-components';
import {
  Empty,
  IconButton,
  MoreAction,
  PageHeaderToolbar,
} from '@tkeel/console-components';
import { SmcFilledIcon } from '@tkeel/console-icons';
import {
  ReadWriteType,
  TelemetryItem,
  TelemetryValue,
} from '@tkeel/console-types';

import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import SaveAsSelfTemplateButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/SaveAsSelfTemplateButton';

import TelemetryDataTable from './TelemetryDataTable';

function formatType(type: string) {
  let result = '';
  switch (type) {
    case 'number':
      result = 'float';
      break;
    case 'boolean':
      result = 'bool';
      break;
    case 'object':
      result = 'struct';
      break;
    default:
      result = 'string';
      break;
  }
  return result;
}
type Props = {
  deviceId: string;
  basicInfo: BasicInfo;
  refetch?: () => void;
  telemetryFields: TelemetryItem[];
  telemetryValues: TelemetryValue;
  telemetryDefaultValues: TelemetryValue;
  wsReadyState: number;
};
const FILTER_COLUMNS = ['name', 'id', 'type'];
function getFilterList({
  list,
  keywords,
}: {
  list: TelemetryItem[];
  keywords: string;
}) {
  if (keywords) {
    return list.filter((item) => {
      return FILTER_COLUMNS.find((key) =>
        (item[key] as string).includes(keywords)
      );
    });
  }
  return list;
}
export default function TelemetryData({
  deviceId,
  basicInfo,
  refetch: refetchDeviceDetail = () => {},
  telemetryFields,
  telemetryValues,
  telemetryDefaultValues,
  wsReadyState,
}: Props) {
  const [keywords, setKeywords] = useState('');
  const deviceName = basicInfo?.name ?? '';
  const templateId = basicInfo?.templateId ?? '';
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
  };
  const [renderTelemetryValue, setRenderTelemetryValue] = useState(
    telemetryDefaultValues
  );
  const [telemetryValuesHistory, setTelemetryValuesHistory] =
    useState<TelemetryValue>(telemetryValues);
  const func = throttle(setTelemetryValuesHistory, 10 * 1000);

  const [selectedDevices, setSelectedDevices] = useState<TelemetryItem[]>([]);

  const handleSelect = useCallback(
    ({ selectedFlatRows }: { selectedFlatRows: TelemetryItem[] }) => {
      setSelectedDevices(selectedFlatRows);
    },
    [setSelectedDevices]
  );

  const deleteCallback = useCallback(
    (callSelectedDevices: TelemetryItem[]) => {
      const shouldDelete = Object.keys(telemetryValuesHistory).filter((key) => {
        return some(callSelectedDevices, (select) => {
          return select.id === key;
        });
      });
      setTelemetryValuesHistory(omit(telemetryValuesHistory, shouldDelete));
      setSelectedDevices(
        filter(selectedDevices, (item) => {
          return some(callSelectedDevices, (select) => {
            return select.id !== item.id;
          });
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [telemetryValuesHistory]
  );

  useEffect(() => {
    func((preState) => {
      if (isEmpty(telemetryValues)) return preState;
      return { ...preState, ...telemetryValues };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telemetryValues]);

  useEffect(() => {
    if (wsReadyState === 1 && !isEmpty(telemetryValuesHistory)) {
      setRenderTelemetryValue({
        ...telemetryDefaultValues,
        ...telemetryValuesHistory,
      });
    }
  }, [wsReadyState, telemetryValuesHistory, telemetryDefaultValues]);

  const dataTable = useMemo(() => {
    const telemetryFieldsExtra = !basicInfo?.selfLearn
      ? []
      : Object.entries(telemetryValuesHistory)
          .filter((val) => !telemetryFields.some((v) => v.id === val[0]))
          .map((item) => {
            const id = item[0];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { ts, value } = item[1];
            const existItem = telemetryFields.find((v) => v.id === id);
            if (existItem) {
              return existItem;
            }
            const type = typeof value;
            return {
              id,
              type: formatType(type),
              name: id,
              define: {
                default_value: '',
                rw: 'rw' as ReadWriteType,
              },

              description: '',
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              last_time: ts || Date.now(),
            };
          });
    return (
      <TelemetryDataTable
        telemetryFields={getFilterList({
          list: [...telemetryFields, ...telemetryFieldsExtra],
          keywords,
        })}
        templateTelemetryFields={telemetryFields}
        telemetryValues={renderTelemetryValue}
        deviceId={deviceId}
        hasKeywords={!!keywords}
        handleSelect={handleSelect}
        refetch={refetchDeviceDetail}
        deleteCallback={deleteCallback}
      />
    );
  }, [
    renderTelemetryValue,
    deleteCallback,
    deviceId,
    keywords,
    telemetryFields,
    telemetryValuesHistory,
    basicInfo?.selfLearn,
    handleSelect,
    refetchDeviceDetail,
  ]);
  return (
    <Box h="100%">
      {isEmpty(telemetryFields) && !basicInfo?.selfLearn ? (
        <Empty
          description={
            <Box>
              <Box display="inline" color="gray.700" fontWeight="500">
                [{deviceName}]&nbsp;
              </Box>
              暂无遥测数据,可手动添加
            </Box>
          }
          styles={{
            wrapper: { height: '60%' },
            title: { marginTop: '0' },
            content: { marginTop: '20px' },
          }}
          title=""
          content={
            <CreateTelemetryButton
              uid={deviceId}
              refetch={refetchDeviceDetail}
              source="device"
            />
          }
        />
      ) : (
        <Flex flexDir="column" h="100%">
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name={
              <Flex align="center">
                {selectedDevices.length > 0 ? (
                  <MoreAction
                    styles={{ actionList: { width: '110px' } }}
                    type="text"
                    buttons={[
                      <SaveTelemetryButton
                        key="save"
                        uid={deviceId}
                        selectedDevices={selectedDevices}
                        refetch={refetchDeviceDetail}
                        source="device"
                      />,
                      <DeleteTelemetryButton
                        key="delete"
                        selectedDevices={selectedDevices}
                        uid={deviceId}
                        refetch={refetchDeviceDetail}
                        deleteCallback={deleteCallback}
                        source="device"
                      />,
                    ]}
                  />
                ) : (
                  <Text mr="12px">遥测数据</Text>
                )}
              </Flex>
            }
            hasSearchInput
            searchInputProps={{
              onSearch: handleSearch,
            }}
            buttons={[
              <CreateTelemetryButton
                key="add"
                uid={deviceId}
                refetch={refetchDeviceDetail}
                source="device"
              />,
              templateId ? (
                <MoreAction
                  styles={{ actionList: { width: '110px' } }}
                  element={
                    <IconButton
                      style={{ padding: '0 12px' }}
                      colorScheme="gray"
                      icon={<SmcFilledIcon size="14px" color="white" />}
                    >
                      同步模板
                    </IconButton>
                  }
                  key="more"
                  buttons={[
                    <SaveAsSelfTemplateButton key="sync" id={deviceId} />,
                    <SaveAsOtherTemplateButton key="save" id={deviceId} />,
                  ]}
                />
              ) : (
                <SaveAsOtherTemplateButton
                  variant="iconButton"
                  key="save"
                  id={deviceId}
                  supportRef
                  refetch={refetchDeviceDetail}
                />
              ),
            ]}
          />
          {dataTable}
        </Flex>
      )}
    </Box>
  );
}
