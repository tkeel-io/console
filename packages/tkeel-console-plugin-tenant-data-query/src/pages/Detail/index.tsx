import { Circle, Flex, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DateRangePicker, IconButton } from '@tkeel/console-components';
import {
  // BroomFilledIcon,
  // ChevronDownFilledIcon,
  DownloadFilledIcon,
  LeftFilledIcon,
  RefreshFilledIcon,
  RightFilledIcon,
  // ChevronUpFilledIcon
} from '@tkeel/console-icons';

import useTelemetryDataMutation from '@/tkeel-console-plugin-tenant-data-query/hooks/mutations/useTelemetryDataMutation';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceDetailQuery';

import CustomCircle from './components/CustomCircle';
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
  const [templateCheckboxStatus, setTemplateCheckboxStatus] = useState(
    CheckBoxStatus.NOT_CHECKED
  );
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(
    getSeconds(dayjs().subtract(3, 'day').valueOf())
  );
  const [endTime, setEndTime] = useState(getSeconds(dayjs().valueOf()));
  const dateRangeLength = 5;
  const intervalTime = (endTime - startTime) / dateRangeLength;

  const [rangeIndex, setRangeIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { deviceObject } = useDeviceDetailQuery({
    id,
  });
  const telemetry = deviceObject?.configs?.telemetry ?? {};

  const identifiers = checkedKeys.join(',');

  const hasIdentifiers = identifiers.length > 0;

  const {
    mutate,
    data,
    isSuccess: isTelemetryDataSuccess,
    isLoading: isTelemetryDataLoading,
  } = useTelemetryDataMutation();

  const handleExportData = () => {
    if (isTelemetryDataSuccess) {
      window.open(
        `http://192.168.123.9:30707/apis/core/v1/ts/${id}?start_time=${startTime}&end_time=${endTime}&identifiers=${identifiers}`
      );
    }
  };

  const defaultDataMutateProps = {
    requestStartTime: startTime,
    requestEndTime: endTime,
  };

  const handleTelemetryDataMutate = (props?: {
    requestStartTime: number;
    requestEndTime: number;
  }) => {
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
  const tableDataItems = originDataItems.filter(
    (item) =>
      Number(item.time) >= rangeStartTime * 1000 &&
      Number(item.time) <= rangeEndTime * 1000
  );

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
          isTelemetryDataLoading={isTelemetryDataLoading}
          onSearch={(value) => setKeywords(value)}
          onConfirm={handleTelemetryDataMutate}
        />
      </Flex>
      <Flex
        marginLeft="12px"
        padding="12px 20px"
        flex="1"
        overflow="hidden"
        flexDirection="column"
        borderRadius="4px"
        backgroundColor="white"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text
              marginRight="12px"
              color="gray.700"
              fontSize="14px"
              fontWeight="600"
              lineHeight="32px"
            >
              数据结果
            </Text>
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
                    dayjs(date).isBefore(dayjs().subtract(3, 'day')) ||
                    dayjs(date).isAfter(dayjs())
                  );
                }}
                onOk={(date: [Date, Date]) => {
                  const requestStartTime = getSeconds(dayjs(date[0]).valueOf());
                  const requestEndTime = getSeconds(dayjs(date[1]).valueOf());
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
            <IconButton
              paddingLeft="4px"
              paddingRight="16px"
              icon={<DownloadFilledIcon size={14} />}
              isShowCircle
              disabled={!isTelemetryDataSuccess}
              // isLoading={isExportDataLoading}
              onClick={handleExportData}
            >
              数据导出
            </IconButton>
          </Flex>
        </Flex>
        <Flex
          marginTop="12px"
          marginBottom="8px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="12px">遥测数据</Text>
          <Flex>
            <CustomCircle onClick={() => {}}>
              <LeftFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
            <CustomCircle marginLeft="8px" onClick={() => {}}>
              <RightFilledIcon color="grayAlternatives.300" />
            </CustomCircle>
          </Flex>
        </Flex>
        <DateRangeIndicator
          startTime={startTime}
          rangeIndex={rangeIndex}
          dateRangeLength={dateRangeLength}
          intervalTime={intervalTime}
          setRangeIndex={setRangeIndex}
        />
        <DataTable
          originalData={originDataItems}
          data={tableDataItems}
          isLoading={isTelemetryDataLoading}
          telemetry={telemetry}
          styles={{
            wrapper: { flex: '1', marginTop: '10px', overflowY: 'auto' },
            loading: { flex: '1' },
            empty: { flex: '1' },
          }}
        />
      </Flex>
    </Flex>
  );
}
