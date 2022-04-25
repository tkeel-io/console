import { Center, Flex, HStack, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DateRangePicker } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import SearchEmpty from '@/tkeel-console-plugin-tenant-data-query/components/SearchEmpty';
import useTelemetryDataMutation from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useTelemetryDataMutation';
import useDeviceDetailQuery, {
  TelemetryFields,
} from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

import { ExportButton, RefreshButton } from './components/Buttons';
import { CheckboxStatus } from './components/CustomCheckbox';
import DataResultTitle from './components/DataResultTitle';
import DataTable from './components/DataTable';
import DateRangeIndicator from './components/DateRangeIndicator';
import DateSelect, {
  getRecentTimestamp,
  TimeType,
} from './components/DateSelect';
import DeviceDetailCard from './components/DeviceDetailCard';
import PropertiesConditions, {
  DataType,
} from './components/PropertiesConditions';
import RawDataTable from './components/RawDataTable';

export default function Detail() {
  const [dataType, setDataType] = useState<DataType>(DataType.RAW_DATA);
  const [keywords, setKeywords] = useState('');
  const [telemetry, setTelemetry] = useState<TelemetryFields>({});
  const [filteredTelemetry, setFilteredTelemetry] = useState<TelemetryFields>(
    {}
  );
  const [templateCheckboxStatus, setTemplateCheckboxStatus] = useState(
    CheckboxStatus.CHECKED
  );
  const [rawDataCheckboxStatus, setRawDataCheckboxStatus] = useState(
    CheckboxStatus.CHECKED
  );
  const rawDataCheckboxItems = useMemo(
    () => [
      {
        label: '上行信息',
        value: 'upstream',
      },
      {
        label: '下行信息',
        value: 'downstream',
      },
      {
        label: '连接信息',
        value: 'connecting',
      },
    ],
    []
  );

  const rawDataCheckboxKeys = rawDataCheckboxItems.map(({ value }) => value);
  const [rawDataCheckedKeys, setRawDataCheckedKeys] =
    useState<string[]>(rawDataCheckboxKeys);
  const [templateDataCheckedKeys, setTemplateDataCheckedKeys] = useState<
    string[]
  >([]);
  const [isTelemetryDataRequested, setIsTelemetryDataRequested] =
    useState(false);
  const [timeType, setTimeType] = useState<TimeType>(TimeType.FiveMinutes);
  const [startTime, setStartTime] = useState(getRecentTimestamp(5));
  const [endTime, setEndTime] = useState(dayjs().unix());
  const dateRangeLength = 5;
  const intervalTime = (endTime - startTime) / dateRangeLength;

  const startDate = dayjs(startTime * 1000).toDate();
  const endDate = dayjs(endTime * 1000).toDate();

  const [rangeIndex, setRangeIndex] = useState(0);

  const [isRangeSearch] = useState(false);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';

  const setTelemetryState = (telemetryFields: TelemetryFields) => {
    setTelemetry(telemetryFields);
    setFilteredTelemetry(telemetryFields);
    const telemetryDataKeys = Object.keys(telemetryFields);
    let telemetryKeys = [...telemetryDataKeys];

    const searchTelemetryKeys = searchParams.get('telemetry-keys') || '';
    let telemetryKeyArray = searchTelemetryKeys.split(',');
    telemetryKeyArray = telemetryKeyArray.filter((key) =>
      telemetryDataKeys.includes(key)
    );
    if (telemetryKeyArray.length > 0) {
      telemetryKeys = telemetryKeyArray;
    }
    setTemplateDataCheckedKeys(telemetryKeys);

    let checkedStatus = CheckboxStatus.NOT_CHECKED;
    if (telemetryKeys.length > 0) {
      checkedStatus =
        telemetryKeys.length === telemetryDataKeys.length
          ? CheckboxStatus.CHECKED
          : CheckboxStatus.INDETERMINATE;
    }
    setTemplateCheckboxStatus(checkedStatus);
  };

  const { deviceObject, isLoading: isDeviceDetailLoading } =
    useDeviceDetailQuery({
      id,
      onSuccess(data) {
        const telemetryFields =
          data?.data?.deviceObject?.configs?.telemetry?.define?.fields ?? {};
        setTelemetryState(telemetryFields);
      },
    });

  const identifiers = templateDataCheckedKeys.filter((key) =>
    Object.keys(filteredTelemetry).includes(key)
  );

  const hasIdentifiers = identifiers.length > 0;

  const {
    mutate,
    data,
    isSuccess: isTelemetryDataSuccess,
    isLoading: isTelemetryDataLoading,
  } = useTelemetryDataMutation();

  const getRequestStartTime = (timeTypeValue: TimeType) => {
    switch (timeTypeValue) {
      case TimeType.FiveMinutes:
        return getRecentTimestamp(5);
      case TimeType.ThirtyMinutes:
        return getRecentTimestamp(30);
      case TimeType.OneHour:
        return getRecentTimestamp(1, 'hour');
      default:
        return getRecentTimestamp(3, 'day');
    }
  };

  const handleTelemetryDataMutate = (timeTypeValue?: TimeType) => {
    setIsTelemetryDataRequested(true);

    const requestStartTime = getRequestStartTime(timeTypeValue || timeType);
    const requestEndTime = dayjs().unix();

    mutate({
      url: `core/v1/ts/${id}`,
      data: {
        start_time: requestStartTime,
        end_time: requestEndTime,
        identifiers: identifiers.join(','),
        page_size: 1_000_000,
        page_num: 1,
      },
    });
  };

  const handleSearch = (value: string) => {
    setKeywords(value);
  };

  const originDataItems = data?.items ?? [];
  const rangeStartTime = startTime + rangeIndex * intervalTime;
  const rangeEndTime = rangeStartTime + intervalTime;
  const tableDataItems = isRangeSearch
    ? originDataItems.filter(
        (item) =>
          Number(item.time) >= rangeStartTime * 1000 &&
          Number(item.time) <= rangeEndTime * 1000
      )
    : originDataItems;

  const exportData = originDataItems.map((dataItem) => {
    const valueObj = {};
    identifiers.forEach((key) => {
      const nameKey = telemetry[key].name ?? '';
      valueObj[nameKey] = dataItem.value[key];

      if (!valueObj[nameKey]) {
        valueObj[nameKey] = '-';
      }
    });

    return {
      time: formatDateTimeByTimestamp({
        timestamp: dataItem.time,
        template: 'YYYY/MM/DD HH:mm:ss',
      }),
      ...valueObj,
    };
  });

  const tableTelemetry = {};
  identifiers.forEach((key) => {
    tableTelemetry[key] = telemetry[key];
  });

  useEffect(() => {
    const newFilteredTelemetry = {};
    Object.keys(telemetry).forEach((key) => {
      const name = telemetry[key]?.name ?? '';
      if (name.includes(keywords)) {
        newFilteredTelemetry[key] = telemetry[key];
      }
    });
    setFilteredTelemetry(newFilteredTelemetry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  const getCheckBoxStatus = ({
    checkedLength,
    length,
  }: {
    checkedLength: number;
    length: number;
  }) => {
    let checkboxStatus = CheckboxStatus.NOT_CHECKED;

    if (checkedLength > 0) {
      if (checkedLength === length) {
        checkboxStatus = CheckboxStatus.CHECKED;
      } else if (checkedLength < length) {
        checkboxStatus = CheckboxStatus.INDETERMINATE;
      }
    }
    return checkboxStatus;
  };

  useEffect(() => {
    const { length } = rawDataCheckboxItems;
    const { length: keysLength } = rawDataCheckedKeys;

    setRawDataCheckboxStatus(
      getCheckBoxStatus({ checkedLength: keysLength, length })
    );
  }, [rawDataCheckboxItems, rawDataCheckedKeys]);

  useEffect(() => {
    const { length } = Object.keys(telemetry);
    const { length: keysLength } = templateDataCheckedKeys;

    setTemplateCheckboxStatus(
      getCheckBoxStatus({ checkedLength: keysLength, length })
    );
  }, [telemetry, templateDataCheckedKeys]);

  return (
    <Flex height="100%" justifyContent="space-between">
      <Flex flexDirection="column" width="360px">
        <DeviceDetailCard detailData={deviceObject} />
        <PropertiesConditions
          setDataType={setDataType}
          identifiers={identifiers}
          telemetry={filteredTelemetry}
          templateCheckboxStatus={templateCheckboxStatus}
          setTemplateCheckboxStatus={setTemplateCheckboxStatus}
          rawDataCheckboxStatus={rawDataCheckboxStatus}
          setRawDataCheckboxStatus={setRawDataCheckboxStatus}
          rawDataCheckboxItems={rawDataCheckboxItems}
          rawDataCheckboxKeys={rawDataCheckboxKeys}
          templateDataCheckedKeys={templateDataCheckedKeys}
          setTemplateDataCheckedKeys={setTemplateDataCheckedKeys}
          rawDataCheckedKeys={rawDataCheckedKeys}
          setRawDataCheckedKeys={setRawDataCheckedKeys}
          isDeviceDetailLoading={isDeviceDetailLoading}
          isTelemetryDataLoading={isTelemetryDataLoading}
          onSearch={handleSearch}
          onConfirm={() => handleTelemetryDataMutate()}
        />
      </Flex>
      <Flex
        marginLeft="12px"
        flex="1"
        overflow="hidden"
        flexDirection="column"
        padding="12px 20px"
        borderRadius="4px"
        backgroundColor="white"
      >
        {isTelemetryDataRequested ? (
          <>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <DataResultTitle />
                <Flex>
                  <DateSelect
                    timeType={timeType}
                    hasIdentifiers={hasIdentifiers}
                    setTimeType={setTimeType}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    handleTelemetryDataMutate={handleTelemetryDataMutate}
                  />
                  {timeType === TimeType.Custom && (
                    <DateRangePicker
                      startTime={startDate}
                      endTime={endDate}
                      defaultValue={[startDate, endDate]}
                      disabledDate={(date: Date) => {
                        return (
                          dayjs(date).isBefore(
                            dayjs().subtract(3, 'day'),
                            'day'
                          ) || dayjs(date).isAfter(dayjs(), 'day')
                        );
                      }}
                      onOk={(date: [Date, Date]) => {
                        const requestStartTime = dayjs(date[0]).unix();
                        const requestEndTime = dayjs(date[1]).unix();
                        setStartTime(requestStartTime);
                        setEndTime(requestEndTime);
                        if (hasIdentifiers) {
                          handleTelemetryDataMutate();
                        }
                      }}
                    />
                  )}
                </Flex>
              </Flex>
              <HStack spacing="12px">
                <RefreshButton
                  onClick={handleTelemetryDataMutate}
                  disabled={!hasIdentifiers}
                />
                <ExportButton
                  exportData={exportData}
                  disabled={!isTelemetryDataSuccess}
                />
              </HStack>
            </Flex>
            {dataType === DataType.TEMPLATE_DATA && (
              <Flex
                marginTop="12px"
                marginBottom="8px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="12px">遥测数据</Text>
                {/* <RangeSearchButton
                  isRangeSearch={isRangeSearch}
                  setIsRangeSearch={setIsRangeSearch}
                /> */}
              </Flex>
            )}
            {isRangeSearch && (
              <DateRangeIndicator
                startTime={startTime}
                rangeIndex={rangeIndex}
                dateRangeLength={dateRangeLength}
                intervalTime={intervalTime}
                setRangeIndex={setRangeIndex}
              />
            )}
            <Flex flex="1" marginTop="10px" overflowY="auto">
              {dataType === DataType.TEMPLATE_DATA ? (
                <DataTable
                  originalData={originDataItems}
                  data={tableDataItems}
                  isLoading={isTelemetryDataLoading}
                  telemetry={tableTelemetry}
                  styles={{
                    wrapper: { width: '100%', height: 'max-content' },
                    loading: { flex: '1' },
                    empty: { flex: '1' },
                  }}
                />
              ) : (
                <RawDataTable />
              )}
            </Flex>
          </>
        ) : (
          <>
            <DataResultTitle />
            <Center flex="1">
              <SearchEmpty
                title="请选择查询条件后，点击确定按钮 "
                styles={{ image: { marginBottom: '8px', width: '104px' } }}
              />
            </Center>
          </>
        )}
      </Flex>
    </Flex>
  );
}
