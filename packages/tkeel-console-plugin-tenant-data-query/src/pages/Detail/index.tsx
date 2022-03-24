import { Center, Circle, Flex, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSearchParams } from 'react-router-dom';

import { DateRangePicker, IconButton, Select } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import {
  // RightFilledIcon,
  // CheckFilledIcon,
  DownloadFilledIcon,
  // LeftFilledIcon,
  RefreshFilledIcon,
} from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import SearchEmpty from '@/tkeel-console-plugin-tenant-data-query/components/SearchEmpty';
import useTelemetryDataMutation from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useTelemetryDataMutation';
import useDeviceDetailQuery, {
  TelemetryFields,
} from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

import DataResultTitle from './components/DataResultTitle';
import DataTable from './components/DataTable';
import DateRangeIndicator from './components/DateRangeIndicator';
import DeviceDetailCard from './components/DeviceDetailCard';
import PropertiesConditions, {
  CheckBoxStatus,
} from './components/PropertiesConditions';

enum TimeType {
  FiveMinutes = 'fiveMinutes',
  ThirtyMinutes = 'thirtyMinutes',
  OneHour = 'oneHour',
  Custom = 'custom',
}

function getRecentTimestamp(num: number, unit = 'minute') {
  return dayjs().subtract(num, unit).unix();
}

export default function Detail() {
  const [keywords, setKeywords] = useState('');
  const [telemetry, setTelemetry] = useState<TelemetryFields>({});
  const [templateCheckboxStatus, setTemplateCheckboxStatus] = useState(
    CheckBoxStatus.CHECKED
  );
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [isTelemetryDataRequested, setIsTelemetryDataRequested] =
    useState(false);
  const [timeType, setTimeType] = useState<TimeType>(TimeType.FiveMinutes);
  const [startTime, setStartTime] = useState(getRecentTimestamp(5));
  const [endTime, setEndTime] = useState(dayjs().unix());
  const dateRangeLength = 5;
  const intervalTime = (endTime - startTime) / dateRangeLength;

  const [rangeIndex, setRangeIndex] = useState(0);

  const [isRangeSearch] = useState(false);

  const borderGrayColor = useColor('gray.200');
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { deviceObject, isLoading: isDeviceDetailLoading } =
    useDeviceDetailQuery({
      id,
      onSuccess(data) {
        const telemetryData =
          data?.data?.deviceObject?.configs?.telemetry?.define?.fields ?? {};
        setTelemetry(telemetryData);
        const telemetryDataKeys = Object.keys(telemetryData);
        let telemetryKeys = [...telemetryDataKeys];

        const searchTelemetryKeys = searchParams.get('telemetry-keys') || '';
        let telemetryKeyArray = searchTelemetryKeys.split(',');
        telemetryKeyArray = telemetryKeyArray.filter((key) =>
          telemetryDataKeys.includes(key)
        );
        if (telemetryKeyArray.length > 0) {
          telemetryKeys = telemetryKeyArray;
        }
        setCheckedKeys(telemetryKeys);

        let checkedStatus = CheckBoxStatus.NOT_CHECKED;
        if (telemetryKeys.length > 0) {
          checkedStatus =
            telemetryKeys.length === telemetryDataKeys.length
              ? CheckBoxStatus.CHECKED
              : CheckBoxStatus.INDETERMINATE;
        }
        setTemplateCheckboxStatus(checkedStatus);
      },
    });

  const identifiers = checkedKeys.join(',');

  const hasIdentifiers = identifiers.length > 0;

  const {
    mutate,
    data,
    isSuccess: isTelemetryDataSuccess,
    isLoading: isTelemetryDataLoading,
  } = useTelemetryDataMutation();

  const defaultDataMutateProps = {
    requestStartTime: startTime,
    requestEndTime: endTime,
  };

  const handleTelemetryDataMutate = (props?: {
    requestStartTime: number;
    requestEndTime: number;
  }) => {
    setIsTelemetryDataRequested(true);
    const { requestStartTime, requestEndTime } = {
      ...defaultDataMutateProps,
      ...props,
    };
    mutate({
      url: `core/v1/ts/${id}`,
      data: {
        start_time: requestStartTime,
        end_time: requestEndTime,
        identifiers,
        page_size: 1_000_000,
        page_num: 1,
      },
    });
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
    Object.keys(dataItem.value).forEach((key) => {
      valueObj[key] = dataItem.value[key];
    });
    return {
      time: formatDateTimeByTimestamp({
        timestamp: dataItem.time,
        template: 'YYYY/MM/DD HH:mm:ss',
      }),
      ...valueObj,
    };
  });

  const selectOptions = [
    {
      label: '5 分钟',
      value: TimeType.FiveMinutes,
    },
    {
      label: '30 分钟',
      value: TimeType.ThirtyMinutes,
    },
    {
      label: '1 小时',
      value: TimeType.OneHour,
    },
    {
      label: '自定义',
      value: TimeType.Custom,
    },
  ];

  return (
    <Flex height="100%" justifyContent="space-between">
      <Flex flexDirection="column" width="360px">
        <DeviceDetailCard detailData={deviceObject} />
        <PropertiesConditions
          telemetry={telemetry}
          keywords={keywords}
          templateCheckboxStatus={templateCheckboxStatus}
          setTemplateCheckboxStatus={setTemplateCheckboxStatus}
          checkedKeys={checkedKeys}
          setCheckedKeys={setCheckedKeys}
          isDeviceDetailLoading={isDeviceDetailLoading}
          isTelemetryDataLoading={isTelemetryDataLoading}
          onSearch={(value) => setKeywords(value)}
          onConfirm={handleTelemetryDataMutate}
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
                  <Select
                    options={selectOptions}
                    onChange={(value) => {
                      const timeTypeValue = value as TimeType;
                      setTimeType(timeTypeValue);

                      let requestStartTime = getRecentTimestamp(5);
                      const requestEndTime = dayjs().unix();

                      if (value === TimeType.ThirtyMinutes) {
                        requestStartTime = getRecentTimestamp(30);
                      }

                      if (value === TimeType.OneHour) {
                        requestStartTime = getRecentTimestamp(1, 'hour');
                      }

                      setStartTime(requestStartTime);
                      setEndTime(requestEndTime);

                      if (hasIdentifiers) {
                        handleTelemetryDataMutate({
                          requestStartTime,
                          requestEndTime,
                        });
                      }
                    }}
                    value={timeType}
                    style={{
                      marginRight: '10px',
                      width: '89px',
                    }}
                    styles={{
                      selector: `padding: 0; line-height: 34px; border-color: ${borderGrayColor};`,
                      selectionSearch: 'padding: 0; line-height: 34px;',
                      selectionItem: 'top: 0; left: 10px;',
                      arrow: 'top: 10px; right: 10px',
                      dropdown: 'padding: 5px; min-height: 42px;',
                      selectItem: 'line-height: 22px;',
                      itemOptionState: 'display: none',
                    }}
                  />
                  {timeType === TimeType.Custom && (
                    <DateRangePicker
                      startTime={dayjs(startTime * 1000).toDate()}
                      endTime={dayjs(endTime * 1000).toDate()}
                      defaultValue={[
                        new Date(startTime * 1000),
                        new Date(endTime * 1000),
                      ]}
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
                          handleTelemetryDataMutate({
                            requestStartTime,
                            requestEndTime,
                          });
                        }
                      }}
                    />
                  )}
                </Flex>
              </Flex>
              <Flex alignItems="center">
                <Circle
                  size="32px"
                  marginRight="5px"
                  backgroundColor="gray.100"
                  cursor={hasIdentifiers ? 'pointer' : 'not-allowed'}
                  onClick={() => {
                    if (hasIdentifiers) {
                      handleTelemetryDataMutate();
                    }
                  }}
                >
                  <RefreshFilledIcon color="grayAlternatives.300" />
                </Circle>
                <CSVLink
                  data={exportData}
                  filename={`data-${dayjs().valueOf()}.csv`}
                >
                  <IconButton
                    paddingLeft="6px"
                    paddingRight="16px"
                    icon={<DownloadFilledIcon size={14} />}
                    isShowCircle
                    disabled={!isTelemetryDataSuccess}
                  >
                    数据导出
                  </IconButton>
                </CSVLink>
              </Flex>
            </Flex>
            <Flex
              marginTop="12px"
              marginBottom="8px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="12px">遥测数据</Text>
              {/* <Flex alignItems="center">
                <Switch
                  size="sm"
                  isChecked={isRangeSearch}
                  colorScheme="primary"
                  __css={{ 'span:focus': { boxShadow: 'none !important' } }}
                  onChange={(e) => {
                    setIsRangeSearch(e.target.checked);
                  }}
                />
                <Text
                  marginLeft="4px"
                  color="gray.700"
                  fontSize="12px"
                  lineHeight="24px"
                >
                  分段查询
                </Text>
                <CustomCircle onClick={() => {}}>
                  <LeftFilledIcon color="grayAlternatives.300" />
                </CustomCircle>
                <CustomCircle marginLeft="8px" onClick={() => {}}>
                  <RightFilledIcon color="grayAlternatives.300" />
                </CustomCircle>
              </Flex> */}
            </Flex>
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
              <DataTable
                originalData={originDataItems}
                data={tableDataItems}
                isLoading={isTelemetryDataLoading}
                telemetry={telemetry}
                styles={{
                  wrapper: { width: '100%', height: 'max-content' },
                  loading: { flex: '1' },
                  empty: { flex: '1' },
                }}
              />
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
