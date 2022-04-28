import { Center, Flex, HStack, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CONNECT_TYPE_INFO_MAP } from '@tkeel/console-business-components';
import { DateRangePicker, MoreActionSelect } from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import SearchEmpty from '@/tkeel-console-plugin-tenant-data-query/components/SearchEmpty';
import useRawDataMutation from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useRawDataMutation';
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

type RawValue = {
  mark: string;
  path: string;
  ts: string;
};

export default function Detail() {
  const [dataType, setDataType] = useState<DataType>(DataType.RAW_DATA);
  const isTemplateData = dataType === DataType.TEMPLATE_DATA;
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
    () =>
      Object.entries(CONNECT_TYPE_INFO_MAP).map(([key, value]) => ({
        label: `${value.title}信息`,
        value: key,
      })),
    []
  );
  const rawDataCheckboxKeys = rawDataCheckboxItems.map(({ value }) => value);
  const [rawDataCheckedKeys, setRawDataCheckedKeys] =
    useState<string[]>(rawDataCheckboxKeys);
  const [templateDataCheckedKeys, setTemplateDataCheckedKeys] = useState<
    string[]
  >([]);
  const [isRawDataRequested, setIsRawDataRequested] = useState(false);
  const [isTemplateDataRequested, setIsTemplateDataRequested] = useState(false);
  // TODO 默认的 dataType 需要改为 TimeType.FiveMinutes
  const [timeType, setTimeType] = useState<TimeType>(TimeType.Custom);
  const [startTime, setStartTime] = useState(getRecentTimestamp(5));
  const [endTime, setEndTime] = useState(dayjs().unix());
  const dateRangeLength = 5;
  const intervalTime = (endTime - startTime) / dateRangeLength;

  const startDate = dayjs(startTime * 1000).toDate();
  const endDate = dayjs(endTime * 1000).toDate();

  const [rawDataType, setRawDataType] = useState('text');

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
  const hasRawDataKeys = rawDataCheckedKeys.length > 0;
  const canRequest = isTemplateData ? hasIdentifiers : hasRawDataKeys;

  const { mutate: rawDataMutate, data: responseRawData } = useRawDataMutation({
    onSuccess() {
      setIsRawDataRequested(true);
      setIsTemplateDataRequested(false);
    },
  });

  const rawDataList = responseRawData?.items?.map((item) => {
    let rawValue: RawValue | null = null;
    try {
      rawValue = JSON.parse(item.values) as RawValue;
    } catch (error) {
      console.error(error);
    }

    return {
      mark: rawValue?.mark ?? '',
      topic: rawValue?.path ?? '',
      timestamp: rawValue?.ts ?? '',
    };
  });

  const {
    mutate: telemetryDataMutate,
    data: telemetryData,
    isSuccess: isTelemetryDataSuccess,
    isLoading: isTelemetryDataLoading,
  } = useTelemetryDataMutation({
    onSuccess() {
      setIsTemplateDataRequested(true);
      setIsRawDataRequested(false);
    },
  });

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

  const getBaseRequestData = (timeTypeValue?: TimeType) => {
    return {
      start_time: getRequestStartTime(timeTypeValue || timeType),
      end_time: dayjs().unix(),
      page_size: 1_000_000,
      page_num: 1,
    };
  };

  const handleTelemetryDataMutate = (timeTypeValue?: TimeType) => {
    telemetryDataMutate({
      url: `core/v1/ts/${id}`,
      data: {
        ...getBaseRequestData(timeTypeValue),
        identifiers: identifiers.join(','),
      },
    });
  };

  const handleRawDataMutate = (timeTypeValue?: TimeType) => {
    // TODO id 替换为真实的设备id
    rawDataMutate({
      url: 'core/v1/rawdata/iotd-3cab8729-de42-4e9c-9165-1382de4a43b2',
      data: {
        ...getBaseRequestData(timeTypeValue),
        is_descending: true,
        path: 'rawData',
        filters: { mark: rawDataCheckedKeys.join(',') },
      },
    });
  };

  const handleRequestData = (timeTypeValue?: TimeType) => {
    if (isTemplateData) {
      handleTelemetryDataMutate(timeTypeValue);
    } else {
      handleRawDataMutate(timeTypeValue);
    }
  };

  const handleSearch = (value: string) => {
    setKeywords(value);
  };

  const originDataItems = telemetryData?.items ?? [];
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

  const rawDataTypeOptions = [
    { label: '文本', value: 'text' },
    { label: '十六进制', value: 'hex' },
  ];
  return (
    <Flex height="100%" justifyContent="space-between">
      <Flex flexDirection="column" width="360px">
        <DeviceDetailCard detailData={deviceObject} />
        <PropertiesConditions
          canRequest={canRequest}
          setDataType={setDataType}
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
          onConfirm={() => handleRequestData()}
        />
      </Flex>
      <Flex
        marginLeft="12px"
        flex="1"
        overflow="hidden"
        flexDirection="column"
        borderRadius="4px"
        backgroundColor="white"
      >
        {isRawDataRequested || isTemplateDataRequested ? (
          <>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              padding="12px 20px 0"
            >
              <Flex alignItems="center">
                <DataResultTitle />
                <Flex>
                  <DateSelect
                    timeType={timeType}
                    canRequest={canRequest}
                    setTimeType={setTimeType}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    handleRequestData={handleRequestData}
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
                          handleRequestData();
                        }
                      }}
                    />
                  )}
                </Flex>
              </Flex>
              <HStack spacing="12px">
                <MoreActionSelect
                  options={rawDataTypeOptions}
                  value={rawDataType}
                  onChange={(value) => setRawDataType(value)}
                />
                <RefreshButton
                  onClick={() => handleRequestData()}
                  disabled={!hasIdentifiers}
                />
                <ExportButton
                  exportData={exportData}
                  disabled={!isTelemetryDataSuccess}
                />
              </HStack>
            </Flex>
            {isTemplateDataRequested && (
              <Flex
                padding="12px 20px 8px"
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
              {isTemplateDataRequested ? (
                <DataTable
                  originalData={originDataItems}
                  data={tableDataItems}
                  isLoading={isTelemetryDataLoading}
                  telemetry={tableTelemetry}
                  styles={{
                    wrapper: {
                      width: '100%',
                      height: 'max-content',
                      padding: '0 20px 10px',
                    },
                    loading: { flex: '1' },
                    empty: { flex: '1' },
                  }}
                />
              ) : (
                <RawDataTable rawDataList={rawDataList || []} />
              )}
            </Flex>
          </>
        ) : (
          <>
            <DataResultTitle padding="12px 20px 0" />
            <Center flex="1">
              <SearchEmpty
                title="请选择查询条件后，点击确定按钮"
                styles={{ image: { marginBottom: '8px', width: '104px' } }}
              />
            </Center>
          </>
        )}
      </Flex>
    </Flex>
  );
}
