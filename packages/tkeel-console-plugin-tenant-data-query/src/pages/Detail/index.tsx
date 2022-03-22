import { Center, Circle, Flex, Switch, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useSearchParams } from 'react-router-dom';

import { DateRangePicker, IconButton } from '@tkeel/console-components';
import {
  DownloadFilledIcon,
  // LeftFilledIcon,
  RefreshFilledIcon,
  // RightFilledIcon,
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

function getSeconds(timestamp: number) {
  return Math.round(timestamp / 1000);
}

export default function Detail() {
  const [keywords, setKeywords] = useState('');
  const [telemetry, setTelemetry] = useState<TelemetryFields>({});
  const [templateCheckboxStatus, setTemplateCheckboxStatus] = useState(
    CheckBoxStatus.NOT_CHECKED
  );
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [isTelemetryDataRequested, setIsTelemetryDataRequested] =
    useState(false);
  const [startTime, setStartTime] = useState(
    getSeconds(dayjs().subtract(1, 'hour').valueOf())
  );
  const [endTime, setEndTime] = useState(getSeconds(dayjs().valueOf()));
  const dateRangeLength = 5;
  const intervalTime = (endTime - startTime) / dateRangeLength;

  const [rangeIndex, setRangeIndex] = useState(0);

  const [isRangeSearch, setIsRangeSearch] = useState(false);

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
                      const requestStartTime = getSeconds(
                        dayjs(date[0]).valueOf()
                      );
                      const requestEndTime = getSeconds(
                        dayjs(date[1]).valueOf()
                      );
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
                    paddingLeft="4px"
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
              <Flex alignItems="center">
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
                {/* <CustomCircle onClick={() => {}}>
              <LeftFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
            <CustomCircle marginLeft="8px" onClick={() => {}}>
              <RightFilledIcon color="grayAlternatives.300" />
            </CustomCircle> */}
              </Flex>
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
                title="请选择查询条件后，点击查询按钮 "
                styles={{ image: { marginBottom: '8px', width: '104px' } }}
              />
            </Center>
          </>
        )}
      </Flex>
    </Flex>
  );
}
