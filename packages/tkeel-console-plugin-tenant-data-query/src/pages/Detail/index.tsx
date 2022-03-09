import { Circle, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IconButton } from '@tkeel/console-components';
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

export default function Detail() {
  const [keywords, setKeywords] = useState('');
  // eslint-disable-next-line no-console
  console.log('Detail ~ keywords', keywords);
  const [templateCheckboxStatus, setTemplateCheckboxStatus] = useState(
    CheckBoxStatus.NOT_CHECKED
  );
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [startTime] = useState(1_646_569_642);
  const [endTime] = useState(1_646_728_732);
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

  const handleTelemetryDataMutate = () => {
    mutate({
      url: `core/v1/ts/${id}`,
      data: {
        start_time: startTime,
        end_time: endTime,
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
            <Flex>时间选择器</Flex>
          </Flex>
          <Flex alignItems="center">
            <Circle
              size="32px"
              marginRight="5px"
              backgroundColor="gray.100"
              cursor={identifiers.length > 0 ? 'pointer' : 'not-allowed'}
              onClick={() => {
                if (identifiers.length > 0) {
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
